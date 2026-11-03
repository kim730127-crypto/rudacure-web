"use client";

/**
 * Ink hero (design preview, 2026-11).
 *
 * Staging idea borrowed from GetLayers "Dantora": ink dropped into still
 * water, a structure that keeps shedding plumes which curl outward on a slow
 * flow field and part wherever the cursor goes. Only the idea is reused. No
 * prompt text, code or media from GetLayers is in this file.
 *
 * The structure is the same real data as the production hero: every core
 * point is an atom from RCSB PDB 8GFA (human TRPV1, SB-366791 bound, CC0).
 * Dantora uses a DNA helix; RudaCure is a membrane-protein company, so the
 * ion channel and its lipid belt stay the subject. The plumes are emitted
 * from those atoms and are visibly separate from them, so the anatomy never
 * dissolves into abstraction.
 *
 * Light "water" background, normal blending (additive blending only works
 * on black). prefers-reduced-motion renders a single still frame.
 */

import { useEffect, useRef, useState } from "react";

const DATA_URL = "/data/trpv1.bin";
const PLUMES = 6000;

type Cloud = { positions: Float32Array; kinds: Uint8Array; count: number };

async function loadCloud(signal: AbortSignal): Promise<Cloud> {
  const res = await fetch(DATA_URL, { signal });
  if (!res.ok) throw new Error(`point cloud ${res.status}`);
  const buf = await res.arrayBuffer();
  const count = new DataView(buf).getUint32(0, true);
  const quant = new Int16Array(buf, 4, count * 3);
  const kinds = new Uint8Array(buf, 4 + count * 6, count);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 1) positions[i] = quant[i] / 32767;
  return { positions, kinds, count };
}

/* Shared vertex code: projects a point, then pushes it away from the cursor
   in screen space. uPart scales the push so the core moves less than ink. */
const PART_GLSL = `
  uniform vec2 uMouse;
  uniform float uMouseOn;
  uniform float uAspect;
  vec4 partAroundCursor(vec4 clip, float strength) {
    vec2 ndc = clip.xy / clip.w;
    vec2 d = ndc - uMouse;
    d.x *= uAspect;
    float len = length(d);
    float R = 0.34;
    float push = smoothstep(R, 0.0, len) * strength * uMouseOn;
    vec2 dir = len > 0.0001 ? d / len : vec2(0.0, 1.0);
    dir.x /= uAspect;
    ndc += dir * push * 0.22;
    return vec4(ndc * clip.w, clip.zw);
  }
`;

export function InkHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 240);

    const abort = new AbortController();
    let dispose: (() => void) | undefined;
    let cancelled = false;

    const boot = async () => {
      try {
        const probe = document.createElement("canvas");
        if (!probe.getContext("webgl2") && !probe.getContext("webgl")) return;

        const [THREE, cloud] = await Promise.all([
          import("three"),
          loadCloud(abort.signal),
        ]);
        if (cancelled) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const wide = window.matchMedia("(min-width: 900px)");

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
        camera.position.set(0, 0.6, 9.4);
        camera.lookAt(0, -0.05, 0);

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: false,
          powerPreference: "low-power",
          premultipliedAlpha: false,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const SCALE = 2.15;
        const group = new THREE.Group();
        scene.add(group);

        /* ---------- Core: the channel itself, drawn as ink dots ---------- */
        // Dark ink for protein, accent teal for the lipid belt, deep accent
        // for the bound antagonist. Colours are the --rc-* tokens.
        const PALETTE = [
          [0.06, 0.16, 0.19], // protein   - ink
          [0.043, 0.486, 0.447], // POPC  - --rc-accent #0b7c72
          [0.039, 0.373, 0.345], // SB-366791 - --rc-accent-deep #0a5f58
        ];
        const SIZES = [4.4, 6.4, 8.5];
        const ALPHA = [0.5, 0.85, 1.0];

        const n = cloud.count;
        const corePos = new Float32Array(n * 3);
        const coreCol = new Float32Array(n * 3);
        const coreSize = new Float32Array(n);
        const coreAlpha = new Float32Array(n);
        const coreSeed = new Float32Array(n);
        for (let i = 0; i < n; i += 1) {
          const k = cloud.kinds[i];
          corePos[i * 3] = cloud.positions[i * 3] * SCALE;
          corePos[i * 3 + 1] = cloud.positions[i * 3 + 1] * SCALE;
          corePos[i * 3 + 2] = cloud.positions[i * 3 + 2] * SCALE;
          coreCol.set(PALETTE[k], i * 3);
          coreSize[i] = SIZES[k];
          coreAlpha[i] = ALPHA[k];
          coreSeed[i] = Math.random() * Math.PI * 2;
        }

        const uniforms = {
          uTime: { value: 0 },
          uPixelRatio: { value: renderer.getPixelRatio() },
          uOpacity: { value: 0 },
          uMouse: { value: new THREE.Vector2(9, 9) },
          uMouseOn: { value: 0 },
          uAspect: { value: 1 },
        };

        const coreGeo = new THREE.BufferGeometry();
        coreGeo.setAttribute("position", new THREE.BufferAttribute(corePos, 3));
        coreGeo.setAttribute("aColor", new THREE.BufferAttribute(coreCol, 3));
        coreGeo.setAttribute("aSize", new THREE.BufferAttribute(coreSize, 1));
        coreGeo.setAttribute("aAlpha", new THREE.BufferAttribute(coreAlpha, 1));
        coreGeo.setAttribute("aSeed", new THREE.BufferAttribute(coreSeed, 1));

        const coreMat = new THREE.ShaderMaterial({
          uniforms,
          vertexShader: `
            attribute vec3 aColor;
            attribute float aSize;
            attribute float aAlpha;
            attribute float aSeed;
            uniform float uTime;
            uniform float uPixelRatio;
            varying vec3 vColor;
            varying float vAlpha;
            ${PART_GLSL}
            void main() {
              vec3 p = position;
              p += 0.012 * vec3(
                sin(uTime * 0.7 + aSeed),
                cos(uTime * 0.6 + aSeed * 1.3),
                sin(uTime * 0.5 + aSeed * 0.7)
              );
              vec4 mv = modelViewMatrix * vec4(p, 1.0);
              vec4 clip = projectionMatrix * mv;
              gl_Position = partAroundCursor(clip, 0.35);
              float depth = -mv.z;
              vAlpha = aAlpha * smoothstep(13.0, 5.0, depth);
              vColor = aColor;
              gl_PointSize = aSize * uPixelRatio * (7.0 / depth);
            }
          `,
          fragmentShader: `
            precision mediump float;
            uniform float uOpacity;
            varying vec3 vColor;
            varying float vAlpha;
            void main() {
              vec2 d = gl_PointCoord - vec2(0.5);
              float r = dot(d, d);
              if (r > 0.25) discard;
              float a = smoothstep(0.25, 0.04, r) * vAlpha * uOpacity;
              gl_FragColor = vec4(vColor, a);
            }
          `,
          transparent: true,
          depthWrite: false,
        });
        group.add(new THREE.Points(coreGeo, coreMat));

        /* ---------- Plumes: ink that keeps leaving the structure ---------- */
        // Each plume particle is born on a real atom, lives for a few seconds
        // on a looping phase, curls outward on a cheap analytic flow field and
        // spreads (grows, thins) the way a drop of ink does in water.
        const origin = new Float32Array(PLUMES * 3);
        const pSeed = new Float32Array(PLUMES);
        const pRate = new Float32Array(PLUMES);
        const pKind = new Float32Array(PLUMES);
        for (let i = 0; i < PLUMES; i += 1) {
          const a = Math.floor(Math.random() * n);
          origin[i * 3] = corePos[a * 3];
          origin[i * 3 + 1] = corePos[a * 3 + 1];
          origin[i * 3 + 2] = corePos[a * 3 + 2];
          pSeed[i] = Math.random();
          pRate[i] = 0.06 + Math.random() * 0.07;
          pKind[i] = cloud.kinds[a] === 1 ? 1 : 0;
        }
        const plumeGeo = new THREE.BufferGeometry();
        plumeGeo.setAttribute("position", new THREE.BufferAttribute(origin, 3));
        plumeGeo.setAttribute("aSeed", new THREE.BufferAttribute(pSeed, 1));
        plumeGeo.setAttribute("aRate", new THREE.BufferAttribute(pRate, 1));
        plumeGeo.setAttribute("aKind", new THREE.BufferAttribute(pKind, 1));

        const plumeMat = new THREE.ShaderMaterial({
          uniforms,
          vertexShader: `
            attribute float aSeed;
            attribute float aRate;
            attribute float aKind;
            uniform float uTime;
            uniform float uPixelRatio;
            varying float vAlpha;
            varying float vKind;
            ${PART_GLSL}
            vec3 flow(vec3 p, float t) {
              return vec3(
                sin(p.y * 1.35 + t * 0.31) + cos(p.z * 0.9 - t * 0.17),
                sin(p.z * 1.10 - t * 0.23) + 0.55,
                cos(p.x * 1.25 + t * 0.27) + sin(p.y * 0.8 + t * 0.13)
              );
            }
            void main() {
              float life = fract(uTime * aRate + aSeed);
              float t = uTime * 0.35 + aSeed * 40.0;
              vec3 o = position;
              // Two-step integration of the flow keeps the trails curling
              // instead of travelling in straight lines.
              vec3 p1 = o + flow(o, t) * life * 0.55;
              vec3 p = p1 + flow(p1 * 1.3, t + 2.0) * life * life * 1.25;
              vec2 radial = length(o.xz) > 0.001 ? normalize(o.xz) : vec2(1.0, 0.0);
              p.xz += radial * life * 0.6;
              vec4 mv = modelViewMatrix * vec4(p, 1.0);
              vec4 clip = projectionMatrix * mv;
              gl_Position = partAroundCursor(clip, 1.0);
              float depth = -mv.z;
              float born = smoothstep(0.0, 0.12, life);
              float fade = pow(1.0 - life, 1.6);
              vAlpha = born * fade * smoothstep(13.0, 5.0, depth);
              vKind = aKind;
              gl_PointSize = mix(4.0, 46.0, life) * uPixelRatio * (7.0 / depth);
            }
          `,
          fragmentShader: `
            precision mediump float;
            uniform float uOpacity;
            varying float vAlpha;
            varying float vKind;
            void main() {
              vec2 d = gl_PointCoord - vec2(0.5);
              float r = dot(d, d);
              if (r > 0.25) discard;
              float soft = exp(-r * 10.0);
              vec3 ink = mix(vec3(0.07, 0.30, 0.31), vec3(0.043, 0.486, 0.447), vKind);
              gl_FragColor = vec4(ink, soft * vAlpha * 0.11 * uOpacity);
            }
          `,
          transparent: true,
          depthWrite: false,
        });
        group.add(new THREE.Points(plumeGeo, plumeMat));

        const resize = () => {
          const rect = canvas.getBoundingClientRect();
          const w = Math.max(1, Math.round(rect.width));
          const h = Math.max(1, Math.round(rect.height));
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h, false);
          uniforms.uAspect.value = w / h;
          // Same membrane-to-horizon offset as the production hero.
          const MEMBRANE_Y = -0.917;
          group.position.x = wide.matches ? 1.95 : 0;
          group.position.y = MEMBRANE_Y + (wide.matches ? 0.72 : -0.05);
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        // Cursor in canvas NDC. Mouse only; touch gets the plumes without
        // the parting.
        const target = new THREE.Vector2(9, 9);
        let mouseOn = 0;
        const onPointer = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          const r = canvas.getBoundingClientRect();
          target.set(
            ((e.clientX - r.left) / r.width) * 2 - 1,
            -(((e.clientY - r.top) / r.height) * 2 - 1),
          );
          mouseOn = e.clientY >= r.top && e.clientY <= r.bottom ? 1 : 0;
        };
        const onLeave = () => {
          mouseOn = 0;
        };
        window.addEventListener("pointermove", onPointer, { passive: true });
        document.addEventListener("pointerleave", onLeave);

        let visible = true;
        const io = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
        });
        io.observe(canvas);

        const start = performance.now();
        let raf = 0;
        const frame = () => {
          raf = requestAnimationFrame(frame);
          if (!visible) return;
          const t = (performance.now() - start) / 1000;
          uniforms.uTime.value = t;
          uniforms.uOpacity.value = Math.min(1, t / 1.2);
          uniforms.uMouse.value.lerp(target, 0.12);
          uniforms.uMouseOn.value += (mouseOn - uniforms.uMouseOn.value) * 0.08;
          group.rotation.y = t * 0.06;
          renderer.render(scene, camera);
        };

        if (reduceMotion.matches) {
          uniforms.uOpacity.value = 1;
          uniforms.uTime.value = 6.0;
          group.rotation.y = 0.6;
          renderer.render(scene, camera);
        } else {
          raf = requestAnimationFrame(frame);
        }
        setLive(true);

        dispose = () => {
          cancelAnimationFrame(raf);
          window.removeEventListener("pointermove", onPointer);
          document.removeEventListener("pointerleave", onLeave);
          ro.disconnect();
          io.disconnect();
          coreGeo.dispose();
          plumeGeo.dispose();
          coreMat.dispose();
          plumeMat.dispose();
          renderer.dispose();
        };
      } catch {
        // The poster stays; copy and CTAs never depend on WebGL.
      }
    };

    idle(() => {
      if (!cancelled) void boot();
    });

    return () => {
      cancelled = true;
      abort.abort();
      dispose?.();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="ink-hero-water" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full transition-opacity duration-1000"
        style={{ opacity: live ? 1 : 0 }}
      />
      <div className="ink-hero-scrim" />
    </div>
  );
}
