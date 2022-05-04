export const lerp = (value1: number, value2: number, amount: number): number => {
  return (1 - amount) * value1 + amount * value2;
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
