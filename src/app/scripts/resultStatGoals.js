export default function getResultStatGoals(x, y, z, g) {
  if (x !== null && y !== null) {
    if (z !== null && g !== null) {
      return `${x}-${y} (${z}:${g})`;
    }
    return `${x}:${y}`;
  }
  return "Нет результата";
}
