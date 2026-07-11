import math, json

C45, S45 = math.cos(math.radians(45)), math.sin(math.radians(45))
C55, S55 = math.cos(math.radians(55)), math.sin(math.radians(55))
VIEW = (-S45*S55, C45*S55, C55)  # toward viewer

def project(p):
    x, y, z = p
    u = x * C45 + y * S45
    v = -x * S45 + y * C45
    return (u, v * C55 - z * S55)

def depth(p):
    return p[0]*VIEW[0] + p[1]*VIEW[1] + p[2]*VIEW[2]

def normal(pts):
    a, b, c = pts[0], pts[1], pts[2]
    u = tuple(b[i]-a[i] for i in range(3)); v = tuple(c[i]-a[i] for i in range(3))
    n = (u[1]*v[2]-u[2]*v[1], u[2]*v[0]-u[0]*v[2], u[0]*v[1]-u[1]*v[0])
    m = math.sqrt(sum(x*x for x in n)) or 1
    return tuple(x/m for x in n)

def centroid(pts):
    n = len(pts)
    return tuple(sum(p[i] for p in pts)/n for i in range(3))

def ngon(n, r, offset_deg=0.0):
    return [(r*math.cos(math.radians(offset_deg + k*360/n)),
             r*math.sin(math.radians(offset_deg + k*360/n))) for k in range(n)]

def ring(pts2d, z, scale=1.0, dx=0.0, dy=0.0):
    return [(x*scale+dx, y*scale+dy, z) for x, y in pts2d]

def sides(upper, lower):
    n = len(upper)
    return [[upper[k], lower[k], lower[(k+1) % n], upper[(k+1) % n]] for k in range(n)]

def cone(ringpts, apex):
    n = len(ringpts)
    return [[ringpts[k], ringpts[(k+1) % n], apex] for k in range(n)]

L = (-0.35, -0.75, 0.56)
Lm = math.sqrt(sum(x*x for x in L)); L = tuple(x/Lm for x in L)

def fix_winding(faces, center):
    out = []
    for pts in faces:
        n = normal(pts)
        c = centroid(pts)
        d = tuple(c[i] - center[i] for i in range(3))
        if n[0]*d[0] + n[1]*d[1] + n[2]*d[2] < 0:
            pts = list(reversed(pts))
        out.append(pts)
    return out

# ---- ONYX: emerald-cut slab ----
def chamfer_rect(hw, hd, c):
    return [(hw, hd-c), (hw-c, hd), (-(hw-c), hd), (-hw, hd-c),
            (-hw, -(hd-c)), (-(hw-c), -hd), (hw-c, -hd), (hw, -(hd-c))]

outline = chamfer_rect(0.95, 0.68, 0.3)
o_table = ring(outline, 0.36, scale=0.6)
o_girdle = ring(outline, 0.0)
o_base = ring(outline, -0.4, scale=0.8)
onyx = fix_winding([o_table] + sides(o_table, o_girdle) + sides(o_girdle, o_base) + [o_base], (0, 0, -0.02))
onyx_parts = [(onyx, False)]

# ---- QUARTZ: two chunky hexagonal crystal points ----
def crystal(r, base_z, shoulder_z, apex_z, dx, dy, offset_deg):
    hexa = ngon(6, r, offset_deg)
    bot = ring(hexa, base_z, dx=dx, dy=dy)
    top = ring(hexa, shoulder_z, dx=dx, dy=dy)
    faces = sides(top, bot) + cone(top, (dx, dy, apex_z)) + [bot]
    center = (dx, dy, (base_z + apex_z) / 2)
    return fix_winding(faces, center)

quartz_parts = [
    (crystal(0.52, -0.42, 0.28, 0.85, 0.14, 0.12, 15), True),
    (crystal(0.32, -0.42, -0.02, 0.38, -0.58, 0.46, 40), True),
]

# ---- GARNET: rhombic dodecahedron ----
def rhombic_dodeca(scale, rot_z_deg):
    cr, sr = math.cos(math.radians(rot_z_deg)), math.sin(math.radians(rot_z_deg))
    def xform(p):
        x, y, z = p
        return ((x*cr - y*sr)*scale, (x*sr + y*cr)*scale, z*scale)
    dirs = []
    for a in (1, -1):
        for b in (1, -1):
            dirs += [(a, b, 0), (a, 0, b), (0, a, b)]
    faces = []
    for nd in dirs:
        idx = [i for i, v in enumerate(nd) if v != 0]
        free = [i for i in range(3) if nd[i] == 0][0]
        o1 = [0,0,0]; o1[idx[0]] = 2*nd[idx[0]]
        o2 = [0,0,0]; o2[idx[1]] = 2*nd[idx[1]]
        c1 = list(nd); c1[free] = 1
        c2 = list(nd); c2[free] = -1
        faces.append([xform(tuple(o1)), xform(tuple(c1)), xform(tuple(o2)), xform(tuple(c2))])
    return fix_winding(faces, (0, 0, 0))

garnet_parts = [(rhombic_dodeca(0.54, 18), False)]

palettes = {
    'onyx':   {'stops': ['#0a0a0a', '#161616', '#242424', '#3d3d3d', '#666666'], 'stroke': 'rgba(255,255,255,0.22)'},
    'quartz': {'stops': ['#c9c9c9', '#dadada', '#e8e8e8', '#f4f4f4', '#ffffff'], 'stroke': 'rgba(10,10,10,0.35)'},
    'garnet': {'stops': ['#7f1d1d', '#991b1b', '#b91c1c', '#dc2626', '#ef4444'], 'stroke': 'rgba(69,10,10,0.45)'},
}

def render(name, parts):
    p = palettes[name]
    stops = p['stops']
    items = []
    for faces, translucent in parts:
        for pts in faces:
            n = normal(pts)
            facing = n[0]*VIEW[0] + n[1]*VIEW[1] + n[2]*VIEW[2]
            proj = [project(q) for q in pts]
            d = sum(depth(q) for q in pts) / len(pts)
            if facing > 0.001:
                s = max(0.0, n[0]*L[0] + n[1]*L[1] + n[2]*L[2])
                items.append((d, proj, s, True, translucent))
            elif translucent:
                items.append((d, proj, 0, False, translucent))
    items.sort(key=lambda t: t[0])
    shades = sorted(set(round(s, 4) for _, _, s, f, _ in items if f))
    rank = {s: (i/(len(shades)-1) if len(shades) > 1 else 1.0) for i, s in enumerate(shades)}
    polys = []
    for d, proj, s, front, translucent in items:
        pts_str = ' '.join(f"{x:.3f},{y:.3f}" for x, y in proj)
        if not front:
            polys.append({'points': pts_str, 'fill': 'none', 'fillOpacity': 1,
                          'stroke': 'rgba(10,10,10,0.08)', 'strokeWidth': 0.016})
            continue
        idx = round(rank[round(s, 4)] * (len(stops) - 1))
        polys.append({'points': pts_str, 'fill': stops[idx],
                      'fillOpacity': 0.94 if translucent else 1,
                      'stroke': p['stroke'], 'strokeWidth': 0.02})
    allpts = [pt for _, proj, _, _, _ in items for pt in proj]
    xs = [x for x, y in allpts]; ys = [y for x, y in allpts]
    # square viewBox centred on the gem so every mark shares one canvas
    pad = 0.1
    side = max(max(xs) - min(xs), max(ys) - min(ys)) + 2 * pad
    cx = (min(xs) + max(xs)) / 2
    cy = (min(ys) + max(ys)) / 2
    vb = f"{cx - side/2:.3f} {cy - side/2:.3f} {side:.3f} {side:.3f}"
    return {'viewBox': vb, 'polys': polys}

gems = {
    'onyx': render('onyx', onyx_parts),
    'quartz': render('quartz', quartz_parts),
    'garnet': render('garnet', garnet_parts),
}

import os
out = []
out.append('// Generated by scripts/gen-gems.py - edit and rerun that script, do not hand-edit')
out.append('const gems = {')
for name, gem in gems.items():
    out.append(f"  {name}: {{")
    out.append(f"    viewBox: '{gem['viewBox']}',")
    out.append('    polys: [')
    for poly in gem['polys']:
        out.append(
            f"      {{ points: '{poly['points']}', fill: '{poly['fill']}', "
            f"fillOpacity: {poly['fillOpacity']}, stroke: '{poly['stroke']}', "
            f"strokeWidth: {poly['strokeWidth']} }},"
        )
    out.append('    ],')
    out.append('  },')
out.append('}')
out.append("")
out.append("""export type GemName = keyof typeof gems

export function GemMark({
  name,
  className,
}: {
  name: GemName
  className?: string
}) {
  const gem = gems[name]
  return (
    <svg viewBox={gem.viewBox} aria-hidden="true" className={className}>
      {gem.polys.map((poly, i) => (
        <polygon
          key={i}
          points={poly.points}
          fill={poly.fill}
          fillOpacity={poly.fillOpacity}
          stroke={poly.stroke}
          strokeWidth={poly.strokeWidth}
          strokeLinejoin="round"
        />
      ))}
    </svg>
  )
}""")

dest = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src', 'components', 'gems.tsx')
open(os.path.abspath(dest), 'w').write('\n'.join(out) + '\n')
print('wrote', os.path.abspath(dest))
