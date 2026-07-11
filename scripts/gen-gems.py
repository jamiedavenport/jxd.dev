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
            polys.append(f'<polygon points="{pts_str}" fill="none" stroke="rgba(10,10,10,0.08)" stroke-width="0.016" stroke-linejoin="round"/>')
            continue
        idx = round(rank[round(s, 4)] * (len(stops) - 1))
        op = ' fill-opacity="0.94"' if translucent else ''
        polys.append(f'<polygon points="{pts_str}" fill="{stops[idx]}"{op} stroke="{p["stroke"]}" stroke-width="0.02" stroke-linejoin="round"/>')
    allpts = [pt for _, proj, _, _, _ in items for pt in proj]
    xs = [x for x, y in allpts]; ys = [y for x, y in allpts]
    pad = 0.08
    vb = f"{min(xs)-pad:.3f} {min(ys)-pad:.3f} {max(xs)-min(xs)+2*pad:.3f} {max(ys)-min(ys)+2*pad:.3f}"
    return f'<svg viewBox="{vb}" aria-hidden="true">{"".join(polys)}</svg>'

svgs = {
    'onyx': render('onyx', onyx_parts),
    'quartz': render('quartz', quartz_parts),
    'garnet': render('garnet', garnet_parts),
}

cells = ''
labels = {'onyx': 'Onyx · Full-stack template', 'quartz': 'Quartz · PM suite', 'garnet': 'Garnet · Compliance'}
for n in ['onyx', 'quartz', 'garnet']:
    g = svgs[n]
    cells += f'''<div style="border:1px solid rgba(10,10,10,.1);padding:40px;text-align:center">
      <div style="width:180px;height:180px;margin:0 auto;display:flex;align-items:center;justify-content:center">{g}</div>
      <div style="margin-top:28px;display:flex;gap:24px;justify-content:center;align-items:center">
        <span style="width:44px;display:inline-flex">{g}</span>
        <span style="width:26px;display:inline-flex">{g}</span>
        <span style="display:inline-flex;align-items:center;gap:8px;font:500 13px/1.2 system-ui;text-align:left"><span style="width:20px;display:inline-flex;flex-shrink:0">{g}</span>{labels[n]}</span>
      </div>
    </div>'''

open('gems.html', 'w').write(f'<!doctype html><meta charset="utf-8"><body style="margin:0;background:#fff;font-family:system-ui"><div style="display:grid;grid-template-columns:repeat(3,1fr);max-width:1000px;margin:60px auto">{cells}</div>')
json.dump(svgs, open('gem-svgs.json', 'w'))
print('ok')
