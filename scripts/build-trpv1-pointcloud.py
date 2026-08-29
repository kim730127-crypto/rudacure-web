#!/usr/bin/env python3
"""Turn the 8GFA cryo-EM coordinates into a compact point cloud for the hero.

Source: RCSB PDB entry 8GFA, human TRPV1 in complex with the analgesic
antagonist SB-366791 (Neuberger et al.).  PDB coordinate data is CC0 1.0.

Output: public/data/trpv1.bin
  uint32  count
  int16   xyz * count   (normalised to [-1,1] * 32767)
  uint8   class * count (0 protein, 1 lipid, 2 ligand)
"""
import math, random, struct, sys, os

SRC = sys.argv[1]
OUT = sys.argv[2]
TARGET_PROTEIN = 11000
TARGET_LIPID = 3000

protein, lipid, ligand = [], [], []
for line in open(SRC):
    rec = line[:6]
    if rec == "ATOM  ":
        if line[76:78].strip() == "H":
            continue
        protein.append((float(line[30:38]), float(line[38:46]), float(line[46:54])))
    elif rec == "HETATM":
        res = line[17:20].strip()
        if line[76:78].strip() == "H":
            continue
        xyz = (float(line[30:38]), float(line[38:46]), float(line[46:54]))
        if res == "POV":
            lipid.append(xyz)
        elif res == "ZEI":
            ligand.append(xyz)

# --- membrane normal from the lipid slab (smallest-variance principal axis) ---
def centroid(pts):
    n = len(pts)
    return tuple(sum(p[i] for p in pts) / n for i in range(3))

def covariance(pts, c):
    m = [[0.0] * 3 for _ in range(3)]
    for p in pts:
        d = (p[0] - c[0], p[1] - c[1], p[2] - c[2])
        for i in range(3):
            for j in range(3):
                m[i][j] += d[i] * d[j]
    n = len(pts)
    return [[m[i][j] / n for j in range(3)] for i in range(3)]

def jacobi(a):
    """Symmetric 3x3 eigen decomposition. Returns (eigenvalues, eigenvectors-as-columns)."""
    a = [row[:] for row in a]
    v = [[1.0 if i == j else 0.0 for j in range(3)] for i in range(3)]
    for _ in range(64):
        off = sum(a[i][j] ** 2 for i in range(3) for j in range(3) if i != j)
        if off < 1e-12:
            break
        for p in range(2):
            for q in range(p + 1, 3):
                if abs(a[p][q]) < 1e-15:
                    continue
                theta = (a[q][q] - a[p][p]) / (2 * a[p][q])
                t = (1 if theta >= 0 else -1) / (abs(theta) + math.sqrt(theta * theta + 1))
                c = 1 / math.sqrt(t * t + 1)
                s = t * c
                for k in range(3):
                    akp, akq = a[k][p], a[k][q]
                    a[k][p], a[k][q] = c * akp - s * akq, s * akp + c * akq
                for k in range(3):
                    apk, aqk = a[p][k], a[q][k]
                    a[p][k], a[q][k] = c * apk - s * aqk, s * apk + c * aqk
                for k in range(3):
                    vkp, vkq = v[k][p], v[k][q]
                    v[k][p], v[k][q] = c * vkp - s * vkq, s * vkp + c * vkq
    return [a[i][i] for i in range(3)], v

lip_c = centroid(lipid)
vals, vecs = jacobi(covariance(lipid, lip_c))
order = sorted(range(3), key=lambda i: vals[i])
normal = [vecs[r][order[0]] for r in range(3)]          # thinnest direction = membrane normal
inplane1 = [vecs[r][order[2]] for r in range(3)]

# PCA fixes the membrane axis but not its sign, so the channel comes out
# upside down half the time.  Resolve it anatomically: TRPV1 carries the
# ankyrin-repeat domain, the C-terminal beta sheet and the TRP helix on the
# cytoplasmic face, and only short loops on the outside, so the protein's
# centre of mass always sits on the INTRACELLULAR side of the lipid slab.
# Flip the axis so that side ends up at -Y, i.e. extracellular is up.
prot_c = centroid(protein)
if sum((prot_c[i] - lip_c[i]) * normal[i] for i in range(3)) > 0:
    normal = [-c for c in normal]

def cross(a, b):
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]

def norm(a):
    n = math.sqrt(sum(x * x for x in a))
    return [x / n for x in a]

ey = norm(normal)          # extracellular -> +Y (screen up), cytoplasm -> -Y
ex = norm(inplane1)
ez = norm(cross(ex, ey))
ex = norm(cross(ey, ez))

allpts = protein + lipid + ligand
cen = centroid(allpts)

def to_local(p):
    d = (p[0] - cen[0], p[1] - cen[1], p[2] - cen[2])
    return (
        d[0] * ex[0] + d[1] * ex[1] + d[2] * ex[2],
        d[0] * ey[0] + d[1] * ey[1] + d[2] * ey[2],
        d[0] * ez[0] + d[1] * ez[1] + d[2] * ez[2],
    )

random.seed(20260818)  # the Chinese grant date, so rebuilds are reproducible
def thin(pts, target):
    return pts if len(pts) <= target else random.sample(pts, target)

sel = [(to_local(p), 0) for p in thin(protein, TARGET_PROTEIN)]
sel += [(to_local(p), 1) for p in thin(lipid, TARGET_LIPID)]
sel += [(to_local(p), 2) for p in ligand]

scale = max(max(abs(c) for c in p) for p, _ in sel)
count = len(sel)

with open(OUT, "wb") as fh:
    fh.write(struct.pack("<I", count))
    for p, _ in sel:
        fh.write(struct.pack("<3h", *(max(-32767, min(32767, int(round(c / scale * 32767)))) for c in p)))
    for _, k in sel:
        fh.write(struct.pack("<B", k))

print(f"protein {len(protein)} -> {min(len(protein), TARGET_PROTEIN)}")
print(f"lipid   {len(lipid)} -> {min(len(lipid), TARGET_LIPID)}")
print(f"ligand  {len(ligand)} (SB-366791, kept whole)")
print(f"total   {count} points, {os.path.getsize(OUT)/1024:.1f} KB, extent {scale:.1f} A")

# Report the orientation so a bad flip can never ship silently again.
ext = [to_local(p)[1] for p in protein]
cyto_side = sum((centroid(protein)[i] - lip_c[i]) * norm(normal)[i] for i in range(3))
print(f"orient  protein centre of mass at y={cyto_side:+.1f} A "
      f"(negative = cytoplasm below the membrane, which is what we want)")
print(f"        y range {min(ext):+.1f} .. {max(ext):+.1f} A")
