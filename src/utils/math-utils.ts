export const lerp = (value1: number, value2: number, amount: number): number => {
  return (1 - amount) * value1 + amount * value2;
};
