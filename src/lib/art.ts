/**
 * Visuels de marque : compositions vapeur en trait (une seule direction artistique).
 * Génère des volutes déterministes à partir d'une graine → chaque page a son visuel, sans image externe.
 * Remplacés par de vraies photos dès que `photo` est fourni (voir PhotoSlot).
 */
function rng(seed: number) {
  let s = seed * 9301 + 49297;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}

export function steamPaths(seed: number, count = 5) {
  const r = rng(seed);
  const paths: { d: string; w: number; o: number; red: boolean }[] = [];
  for (let i = 0; i < count; i++) {
    const x = 40 + (i * 320) / count + r() * 30;
    const a = 30 + r() * 40, b = 20 + r() * 50;
    const d = `M${x.toFixed(0)} 300 C${(x + a).toFixed(0)} 240 ${(x - b).toFixed(0)} 200 ${(x + a / 2).toFixed(0)} 150 S${(x - a).toFixed(0)} 60 ${(x + b / 2).toFixed(0)} 0`;
    paths.push({ d, w: 1.2 + r() * 1.6, o: 0.25 + r() * 0.45, red: i === 1 || (seed % 3 === 0 && i === 3) });
  }
  return paths;
}

/** Motif de surface "technique" : quadrillage de coutures (siège) / jante / grille selon le thème. */
export function motif(seed: number): 'stitch' | 'rim' | 'grid' | 'dots' {
  return (['stitch', 'rim', 'grid', 'dots'] as const)[seed % 4];
}
