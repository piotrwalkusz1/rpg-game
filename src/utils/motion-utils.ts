import { writable } from 'svelte/store';

export namespace MotionUtils {
  export const interpolate = <T>(initialValue: T, interpolateValue: (startValue: T, endValue: T, ratio: number) => T) => {
    const { subscribe, set, update } = writable(initialValue);
    return {
      subscribe,
      set: (endValue: T, duration: number): Promise<void> => {
        return new Promise((resolve) => {
          if (duration === 0) {
            set(endValue);
            resolve();
          } else {
            const startTime = new Date();
            update((startValue) => {
              const setNewValue = () => {
                const ratio = (new Date().getTime() - startTime.getTime()) / duration;
                if (ratio >= 1) {
                  set(endValue);
                  resolve();
                } else {
                  set(interpolateValue(startValue, endValue, ratio));
                  setTimeout(setNewValue);
                }
              };
              setNewValue();
              return startValue;
            });
          }
        });
      }
    };
  };
}
