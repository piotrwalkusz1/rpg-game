import type { Time } from './time';

export const sameTime = (firstTime: Time | undefined, secondTime: Time | undefined): boolean => {
  if (firstTime === undefined && secondTime === undefined) {
    return true;
  }
  if (firstTime === undefined || secondTime === undefined) {
    return false;
  }
  return firstTime.getTime() === secondTime.getTime();
};

export const differentTime = (firstTime: Time | undefined, secondTime: Time | undefined): boolean => {
  return !sameTime(firstTime, secondTime);
};
