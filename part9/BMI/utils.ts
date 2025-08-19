const isPositiveNumber = (argument: string): boolean =>
  !isNaN(Number(argument)) && Number(argument) >= 0;

export const arePositiveNumbers = (args: string[]): boolean =>
  args.every(isPositiveNumber);