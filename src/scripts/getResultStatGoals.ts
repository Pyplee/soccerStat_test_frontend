export default function getResultStatGoals(
  x: number | null,
  y: number | null,
  z: number | null,
  g: number | null,
) {
  if (x !== null && y !== null) {
    if (z !== null && g !== null) {
      return `${x}-${y} (${z}:${g})`;
    }
    return `${x}:${y}`;
  }
  return null;
}
