import { Entity, EntityProvider } from 'engine/core/ecs';
import { Health } from 'engine/modules/health';
import { OfferParty } from 'engine/modules/offer';

describe('EntityProvider', () => {
  describe('getComponent method', () => {
    it('should return entity provider if entity provider is component with desired type', () => {
      const component = new OfferParty();

      expect(EntityProvider.getComponent(component, OfferParty)).toBe(component);
    });

    it('should return component of entity if entity provider is entity with desired component', () => {
      const component = new OfferParty();
      const entity = new Entity();
      entity.addComponent(component);

      expect(EntityProvider.getComponent(entity, OfferParty)).toBe(component);
    });

    it('should return undefined if entity provider is entity without desired component', () => {
      const component = new Health();
      const entity = new Entity();
      entity.addComponent(component);

      expect(EntityProvider.getComponent(entity, OfferParty)).toBeUndefined();
    });

    it('should return component of entity of entity provider if entity provider is component but not with desired type', () => {
      const component = new OfferParty();
      const component2 = new Health();
      const entity = new Entity();
      entity.addComponents([component, component2]);

      expect(EntityProvider.getComponent(component2, OfferParty)).toBe(component);
    });

    it('should return undefined if entity provider is component but not with desired type and entity has no desired component', () => {
      const component = new Health();
      const entity = new Entity();
      entity.addComponent(component);

      expect(EntityProvider.getComponent(component, OfferParty)).toBeUndefined();
    });
  });
});
