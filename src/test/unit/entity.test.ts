import { Entity } from 'engine/core/ecs';
import { Health } from 'engine/modules/health';
import { OfferParty } from 'engine/modules/offer';

describe('Entity', () => {
  describe('requireComponent method', () => {
    it('should return component if entity has component with desired type', () => {
      const entity = new Entity();
      const component = new OfferParty();
      entity.addComponent(component);

      expect(entity.requireComponent(OfferParty)).toBe(component);
    });

    it('should throw error if entity has no component with desired type', () => {
      const entity = new Entity();
      const component = new OfferParty();
      entity.addComponent(component);

      expect(() => entity.requireComponent(Health)).toThrow('Component Health is required');
    });
  });
});
