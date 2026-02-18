import { differenceInYears, isValid, parseISO } from "date-fns";

export const getAge = (birthDate?: Date | string): number => {
  if (!birthDate) return 0;

  const date = birthDate instanceof Date ? birthDate : parseISO(birthDate);

  if (!isValid(date)) return 0;

  const age = differenceInYears(new Date(), date);

  return Math.max(0, age);
};
