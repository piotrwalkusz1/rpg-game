import { Entity } from 'engine/core/ecs';
import { Health, IsAlive } from 'engine/modules/health';

describe('IsAlive', () => {
  describe('check', () => {
    it('should return true if health greater than 0', () => {
      const health = new Health();
      health.healthPoints = 1;

      expect(new IsAlive(health).check()).toBe(true);
    });

    it('should return false if health equal 0', () => {
      const health = new Health();
      health.healthPoints = 0;

      expect(new IsAlive(health).check()).toBe(false);
    });

    it('should return false if no health component', () => {
      expect(new IsAlive(new Entity()).check()).toBe(false);
    });
  });
});
