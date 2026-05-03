// Capital city coordinates [latitude, longitude] for all 29 EP countries
// Used by GlobeSection for COBE markers + interactive overlay

export const COUNTRY_COORDS: Record<string, [number, number]> = {
  belgium:              [50.85,   4.35],
  "bosnia-herzegovina": [43.86,  18.41],
  croatia:              [45.81,  15.98],
  "czech-republic":     [50.08,  14.44],
  estonia:              [59.44,  24.75],
  france:               [48.86,   2.35],
  greece:               [37.98,  23.73],
  hungary:              [47.50,  19.04],
  iceland:              [64.15, -21.94],
  ireland:              [53.35,  -6.26],
  italy:                [41.90,  12.50],
  latvia:               [56.95,  24.11],
  lithuania:            [54.69,  25.28],
  luxembourg:           [49.61,   6.13],
  malta:                [35.90,  14.51],
  montenegro:           [42.44,  19.26],
  netherlands:          [52.37,   4.90],
  "north-macedonia":    [41.99,  21.43],
  norway:               [59.91,  10.75],
  poland:               [52.23,  21.01],
  portugal:             [38.72,  -9.14],
  romania:              [44.43,  26.10],
  serbia:               [44.79,  20.45],
  slovakia:             [48.15,  17.11],
  slovenia:             [46.06,  14.51],
  spain:                [40.42,  -3.70],
  sweden:               [59.33,  18.07],
  switzerland:          [46.95,   7.45],
  uk:                   [51.51,  -0.13],
};

/**
 * Project a lat/lng to 2D screen position matching COBE's rendering.
 * COBE source analysis:
 *   U([lat,lng]): r=lat*PI/180, a=lng*PI/180-PI, o=cos(r) → [-o*cos(a), sin(r), o*sin(a)]
 *   O(t): with f=phi, l=theta →
 *     screenX = cos(f)*t[0] + sin(f)*t[2]
 *     screenY = sin(f)*sin(l)*t[0] + cos(l)*t[1] - cos(f)*sin(l)*t[2]
 *     depth   = -sin(f)*cos(l)*t[0] + sin(l)*t[1] + cos(f)*cos(l)*t[2]
 *   W(location): pos = U(location) * (0.8+elevation), return O(pos)
 */
export function projectToScreen(
  lat: number,
  lng: number,
  phi: number,
  theta: number
): { x: number; y: number; z: number } {
  // U(): convert lat/lng to 3D
  const r = (lat * Math.PI) / 180;
  const a = (lng * Math.PI) / 180 - Math.PI;
  const o = Math.cos(r);
  // Unit sphere point
  const p0 = -o * Math.cos(a);
  const p1 = Math.sin(r);
  const p2 = o * Math.sin(a);

  // Scale to globe surface — slightly inset from COBE's radius (0.8)
  // to keep dots visually inside the globe edge
  const scale = 0.78;
  const t0 = p0 * scale;
  const t1 = p1 * scale;
  const t2 = p2 * scale;

  // O(): rotation by phi (f) and theta (l)
  const cf = Math.cos(phi);
  const sf = Math.sin(phi);
  const cl = Math.cos(theta);
  const sl = Math.sin(theta);

  const sx = cf * t0 + sf * t2;
  const sy = sf * sl * t0 + cl * t1 - cf * sl * t2;
  const depth = -sf * cl * t0 + sl * t1 + cf * cl * t2;

  return { x: sx, y: -sy, z: depth };
}
