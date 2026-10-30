"use client";

/**
 * TRPV1 hero — a WebGL point cloud built from real cryo-EM coordinates.
 *
 * The geometry is not decorative noise.  Every point is an atom from RCSB PDB
 * entry 8GFA, the human TRPV1 channel solved with the analgesic antagonist
 * SB-366791 bound at the vanilloid site:
 *
 *   · 11,000 protein atoms   — the tetrameric channel itself
 *   ·  1,716 POPC atoms      — the lipid belt, i.e. the membrane
 *   ·     80 SB-366791 atoms — four copies of the bound antagonist
 *
 * The channel is pre-oriented in scripts/build-trpv1-pointcloud.py so that the
 * membrane normal runs along Y, which is why the lipid band reads as a
 * horizontal plane with the channel standing through it.  The sign of that
 * axis is resolved anatomically, not by PCA, so the extracellular face is
 * always up and the cytoplasm — ankyrin repeats, C-terminal beta sheet, TRP
 * helix — always hangs below the bilayer.
 *
 * Coordinate data: CC0 1.0 Public Domain (wwPDB).  Cite the structure paper —
 * Neuberger et al., and see public/images/IMAGE-CREDITS.md.
 *
 * Rendering technique adapted from ThreeUI's "Structure Flow" (MIT, © 2026
 * Meng To, https://threeui.com).  We keep the additive-blended drifting point
 * field and replace its random sphere with the coordinates above.
 */

import { useEffect, useRef, useState } from "react";

const DATA_URL = "/data/trpv1.bin";

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

export function Trpv1Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Never block first paint: the scene boots after the browser goes idle.
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

        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        );

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
        camera.position.set(0, 0.35, 9.4);
        camera.lookAt(0, -0.15, 0);

        // The channel is a specimen sitting to the side of the headline, not a
        // wallpaper behind it. On narrow screens there is no room to sit beside
        // the copy, so it recentres and drops below the text instead.
        const wide = window.matchMedia("(min-width: 900px)");

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: false,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Per-point colour and size are driven by which molecule the atom
        // belongs to, so the drug and the membrane read differently from the
        // channel without needing three separate draw calls.
        // The lipid belt has to be legible or the picture stops being about a
        // membrane protein, so POPC is pushed brighter than its atom count
        // would otherwise earn.
        // The bilayer is the landmark that tells the viewer which way is up,
        // and it is outnumbered 6:1 by protein atoms, so it is given far more
        // visual weight than its count would earn. Without that the picture
        // reads as one undifferentiated cloud and the anatomy is lost.
        const PALETTE = [
          [0.66, 0.78, 0.83], // protein   — cool bone white, deliberately quiet
          [0.09, 0.78, 0.70], // POPC      — the membrane plane
          [0.55, 1.0, 0.92], // SB-366791 — the bound antagonist
        ];
        const SIZES = [5.4, 9.5, 11.0];
        const ALPHA = [0.26, 0.5, 0.9];

        const colors = new Float32Array(cloud.count * 3);
        const sizes = new Float32Array(cloud.count);
        const alphas = new Float32Array(cloud.count);
        const seeds = new Float32Array(cloud.count);
        for (let i = 0; i < cloud.count; i += 1) {
          const k = cloud.kinds[i];
          const p = PALETTE[k];
          colors[i * 3] = p[0];
          colors[i * 3 + 1] = p[1];
          colors[i * 3 + 2] = p[2];
          sizes[i] = SIZES[k];
          alphas[i] = ALPHA[k];
          seeds[i] = Math.random() * Math.PI * 2;
        }

        const geometry = new THREE.BufferGeometry();
        const scaled = new Float32Array(cloud.positions.length);
        for (let i = 0; i < scaled.length; i += 1) scaled[i] = cloud.positions[i] * 2.15;
        geometry.setAttribute("position", new THREE.BufferAttribute(scaled, 3));

        // Scroll journey target: one of the four bound SB-366791 copies.
        // Seed on the ligand atom furthest along +x, gather its copy within a
        // radius well under the copy-to-copy spacing, and take the centroid.
        // The protein's own x/z centroid is the channel axis, so the copy's
        // angle around it gives the Y rotation that turns it toward camera.
        let seed = -1;
        let px = 0;
        let pz = 0;
        let pn = 0;
        for (let i = 0; i < cloud.count; i += 1) {
          if (cloud.kinds[i] === 2 && (seed < 0 || scaled[i * 3] > scaled[seed * 3])) seed = i;
          if (cloud.kinds[i] === 0) {
            px += scaled[i * 3];
            pz += scaled[i * 3 + 2];
            pn += 1;
          }
        }
        const ligand = new THREE.Vector3();
        let rotTarget = 0.6;
        if (seed >= 0 && pn > 0) {
          let n = 0;
          for (let i = 0; i < cloud.count; i += 1) {
            if (cloud.kinds[i] !== 2) continue;
            const dx = scaled[i * 3] - scaled[seed * 3];
            const dy = scaled[i * 3 + 1] - scaled[seed * 3 + 1];
            const dz = scaled[i * 3 + 2] - scaled[seed * 3 + 2];
            if (dx * dx + dy * dy + dz * dz < 0.7 * 0.7) {
              ligand.x += scaled[i * 3];
              ligand.y += scaled[i * 3 + 1];
              ligand.z += scaled[i * 3 + 2];
              n += 1;
            }
          }
          ligand.multiplyScalar(1 / n);
          const phi = Math.atan2(ligand.z - pz / pn, ligand.x - px / pn);
          rotTarget = phi - Math.PI / 2;
        }
        geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));
        geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uPixelRatio: { value: renderer.getPixelRatio() },
            uOpacity: { value: 0 },
            uFocus: { value: 0 },
          },
          vertexShader: `
            attribute vec3 aColor;
            attribute float aSize;
            attribute float aAlpha;
            attribute float aSeed;
            uniform float uTime;
            uniform float uPixelRatio;
            uniform float uFocus;
            varying vec3 vColor;
            varying float vFade;
            varying float vGlow;
            varying float vAlpha;
            void main() {
              vec3 p = position;
              // A shallow thermal jitter. Amplitude is well under one point
              // radius, so the structure never smears into abstraction.
              p += 0.014 * vec3(
                sin(uTime * 0.7 + aSeed),
                cos(uTime * 0.6 + aSeed * 1.3),
                sin(uTime * 0.5 + aSeed * 0.7)
              );
              vec4 mv = modelViewMatrix * vec4(p, 1.0);
              gl_Position = projectionMatrix * mv;
              float depth = -mv.z;
              // Near fade so atoms the camera flies past do not blow up.
              vFade = smoothstep(12.6, 4.8, depth) * smoothstep(0.5, 1.6, depth);
              // Ligand alpha is exactly 0.9 (ALPHA[2]); a strict > 0.9 test never
              // matched, so the ligand highlight had silently never applied.
              vGlow = aAlpha > 0.85 ? 1.0 : 0.0;
              // Focus: during the fly-in the protein steps back and the
              // bound ligand comes forward; the membrane stays as context.
              float protein = aAlpha < 0.3 ? 1.0 : 0.0;
              float lipid = (1.0 - protein) * (1.0 - vGlow);
              vAlpha = aAlpha * mix(1.0, 0.22, uFocus * protein) * mix(1.0, 0.4, uFocus * lipid) * mix(1.0, 0.75, uFocus * vGlow);
              // The ligand shares the teal family at rest; in focus it turns
              // warm white so it separates from the membrane band.
              vColor = mix(aColor, vec3(1.0, 0.86, 0.55), uFocus * vGlow);
              float grow = 1.0 + 0.7 * uFocus * vGlow;
              float cap = mix(30.0, 16.0, uFocus) * (1.0 + 0.5 * vGlow);
              gl_PointSize = min(aSize * grow * uPixelRatio * (7.0 / depth), cap * uPixelRatio);
            }
          `,
          fragmentShader: `
            precision mediump float;
            uniform float uOpacity;
            varying vec3 vColor;
            varying float vFade;
            varying float vGlow;
            varying float vAlpha;
            void main() {
              vec2 d = gl_PointCoord - vec2(0.5);
              float r = dot(d, d);
              if (r > 0.25) discard;
              float core = smoothstep(0.25, 0.0, r);
              float alpha = core * vFade * uOpacity * vAlpha;
              gl_FragColor = vec4(vColor * mix(1.0, 1.3, vGlow), alpha);
            }
          `,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        let baseX = 0;
        const resize = () => {
          const rect = canvas.getBoundingClientRect();
          const w = Math.max(1, Math.round(rect.width));
          const h = Math.max(1, Math.round(rect.height));
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h, false);
          // TRPV1 is cytoplasm-heavy, so the centroid of the atom cloud sits
          // well below the bilayer. MEMBRANE_Y lifts the lipid slab back onto
          // the horizon; it is the measured slab centre (+23.8 A of 55.8 A
          // normalised, times the 2.5 world scale) and must be recomputed if
          // the structure or the scale changes.
          // Lipid slab centre measured at +23.8 A of the 55.8 A normalising
          // extent; times the 2.15 world scale that is +0.917. Subtracting it
          // puts the bilayer on the horizon, then it is nudged up so the
          // cytoplasmic domain has room to hang below it.
          const MEMBRANE_Y = -0.917;
          baseX = wide.matches ? 1.95 : 0;
          points.position.x = baseX;
          points.position.y = MEMBRANE_Y + (wide.matches ? 0.42 : -0.05);
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        // Pointer parallax, damped. Touch devices skip it entirely.
        let targetX = 0;
        let targetY = 0;
        let curX = 0;
        let curY = 0;
        const onPointer = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          targetX = (e.clientX / window.innerWidth - 0.5) * 0.34;
          targetY = (e.clientY / window.innerHeight - 0.5) * 0.16;
        };
        window.addEventListener("pointermove", onPointer, { passive: true });

        let visible = true;
        const io = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
          },
          { threshold: 0 },
        );
        io.observe(canvas);

        const start = performance.now();
        let raf = 0;
        let lastT = 0;
        let autoAngle = 0;
        let lockAngle: number | null = null;
        const camPos = new THREE.Vector3();
        const camLook = new THREE.Vector3();
        const flyPos = new THREE.Vector3();
        const flyLook = new THREE.Vector3();
        const ligandWorld = new THREE.Vector3();
        const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
        const ease = (v: number) => (v <= 0 ? 0 : v >= 1 ? 1 : v * v * (3 - 2 * v));
        const frame = () => {
          raf = requestAnimationFrame(frame);
          if (!visible) return;
          const t = (performance.now() - start) / 1000;
          material.uniforms.uTime.value = t;
          material.uniforms.uOpacity.value = Math.min(1, t / 1.4);
          if (!reduceMotion.matches) {
            const dt = Math.min(0.05, t - lastT);
            lastT = t;
            // Journey progress from HeroJourney; 0 when the journey is off.
            const host = canvas.closest<HTMLElement>('[data-journey="on"]');
            const jp = host ? parseFloat(host.style.getPropertyValue("--jp")) || 0 : 0;
            const a = ease(clamp01((jp - 0.06) / 0.36));
            const b = ease(clamp01((jp - 0.48) / 0.3));

            // Auto rotation pauses once the fly-in starts, and the target
            // angle is fixed at that moment so the turn never flips branch.
            if (b === 0) {
              autoAngle += dt * 0.075;
              lockAngle = null;
            } else if (lockAngle === null) {
              let d = (rotTarget - autoAngle) % (Math.PI * 2);
              if (d > Math.PI) d -= Math.PI * 2;
              if (d < -Math.PI) d += Math.PI * 2;
              lockAngle = autoAngle + d;
            }
            points.rotation.y = lockAngle === null ? autoAngle : autoAngle + (lockAngle - autoAngle) * b;

            curX += (targetX - curX) * 0.045;
            curY += (targetY - curY) * 0.045;
            points.rotation.z = curX * 0.2 * (1 - a);
            // RTL captions sit on the right, so the structure goes left.
            const side = document.documentElement.dir === "rtl" ? -1 : 1;
            points.position.x = baseX + (0.9 * side - baseX) * a;

            camPos.set(0, 0.7 + curY * (1 - a), 9.4 - 2.2 * a);
            camLook.set(0, -0.05, 0);
            if (b > 0) {
              points.updateMatrixWorld();
              ligandWorld.copy(ligand).applyMatrix4(points.matrixWorld);
              flyPos.set(ligandWorld.x - 0.7 * side, ligandWorld.y + 0.25, ligandWorld.z + 3.4);
              flyLook.set(ligandWorld.x - 0.7 * side, ligandWorld.y, ligandWorld.z);
              camPos.lerp(flyPos, b);
              camLook.lerp(flyLook, b);
            }
            camera.position.copy(camPos);
            camera.lookAt(camLook);
            material.uniforms.uFocus.value = b;
          } else {
            points.rotation.y = 0.6;
          }
          renderer.render(scene, camera);
        };

        if (reduceMotion.matches) {
          material.uniforms.uOpacity.value = 1;
          points.rotation.y = 0.6;
          renderer.render(scene, camera);
        } else {
          raf = requestAnimationFrame(frame);
        }
        setLive(true);

        dispose = () => {
          cancelAnimationFrame(raf);
          window.removeEventListener("pointermove", onPointer);
          ro.disconnect();
          io.disconnect();
          geometry.dispose();
          material.dispose();
          renderer.dispose();
        };
      } catch {
        // Any failure just leaves the CSS field showing. The headline and the
        // calls to action never depend on WebGL.
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
      {/* Poster layer. Paints instantly and stays behind the canvas so the
          hero is never empty while WebGL boots or if it never does. */}
      <div className="rc-hero-poster" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full transition-opacity duration-1000"
        style={{ opacity: live ? 1 : 0 }}
      />
      {/* Copy always wins. The scrim keeps the headline on solid ground no
          matter where the structure happens to be in its rotation. */}
      <div className="rc-hero-scrim" />
      <div className="rc-hero-vignette" />
    </div>
  );
}
