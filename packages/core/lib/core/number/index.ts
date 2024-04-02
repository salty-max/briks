function clamp(value: number, [min, max]: [number, number]): number {
  return Math.min(Math.max(min, value), max);
}

export { clamp };
