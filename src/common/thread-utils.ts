import { TimeUtils } from './time-utils';

export namespace ThreadUtils {
  export const sleep = (duration: Duration): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, TimeUtils.durationToMiliseconds(duration)));
  };
}
