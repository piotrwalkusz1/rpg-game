import { get } from 'svelte/store';
import { lerp, MotionUtils } from 'utils';

describe('MotionUtils', () => {
  describe('interpolate', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.spyOn(global, 'setTimeout');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should interpolate value', async () => {
      const deltaTimeInMs = 100;
      const durationInMs = 400;
      const value = MotionUtils.interpolate(0, (startValue, endValue, ratio) => lerp(startValue, endValue, ratio), deltaTimeInMs);

      void value.set(20, durationInMs);

      expect(get(value)).toEqual(0);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), deltaTimeInMs);

      jest.runOnlyPendingTimers();

      expect(get(value)).toEqual(5);
      expect(setTimeout).toHaveBeenCalledTimes(2);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), deltaTimeInMs);

      jest.runOnlyPendingTimers();

      expect(get(value)).toEqual(10);
      expect(setTimeout).toHaveBeenCalledTimes(3);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), deltaTimeInMs);

      jest.runOnlyPendingTimers();

      expect(get(value)).toEqual(15);
      expect(setTimeout).toHaveBeenCalledTimes(4);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), deltaTimeInMs);

      jest.runOnlyPendingTimers();

      expect(get(value)).toEqual(20);
      expect(setTimeout).toHaveBeenCalledTimes(4);

      jest.runAllTimers();

      expect(get(value)).toEqual(20);
      expect(setTimeout).toHaveBeenCalledTimes(4);
    });

    it('should set endValue immediately if duration is 0', async () => {
      const deltaTimeInMs = 100;
      const durationInMs = 0;
      const value = MotionUtils.interpolate(0, (startValue, endValue, ratio) => lerp(startValue, endValue, ratio), deltaTimeInMs);

      void value.set(20, durationInMs);

      expect(get(value)).toEqual(20);
      expect(setTimeout).toHaveBeenCalledTimes(0);

      jest.runAllTimers();

      expect(get(value)).toEqual(20);
      expect(setTimeout).toHaveBeenCalledTimes(0);
    });
  });
});
