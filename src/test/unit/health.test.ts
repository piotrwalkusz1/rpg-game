import { Health } from 'engine/modules/health';

describe('Health', () => {
  describe('lostPercentageOfHealth', () => {
    it('should get lost percentage of health', () => {
      const health = new Health({ maxHealthPoints: 250 });
      health.healthPoints = 200;

      expect(health.lostPercentageOfHealth).toBe(20);
    });
  });
});
