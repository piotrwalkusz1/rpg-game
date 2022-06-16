import { Entity } from 'engine/core/ecs';
import { Health, IsAlive } from 'engine/modules/health';
import { IsAliveChecker } from 'engine/modules/health/is-alive-checker';

describe('IsAlive', () => {
  let isAliveChecker: IsAliveChecker;

  beforeEach(() => {
    isAliveChecker = new IsAliveChecker();
  });

  describe('check', () => {
    it('should return true if health greater than 0', () => {
      const health = new Health();
      health.healthPoints = 1;
      const condition = new IsAlive(health);

      expect(isAliveChecker.check(condition)).toBe(true);
    });

    it('should return false if health equal 0', () => {
      const health = new Health();
      health.healthPoints = 0;
      const condition = new IsAlive(health);

      expect(isAliveChecker.check(condition)).toBe(false);
    });

    it('should return false if no health component', () => {
      const condition = new IsAlive(new Entity());

      expect(isAliveChecker.check(condition)).toBe(false);
    });
  });
});
