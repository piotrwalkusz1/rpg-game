import { Component, Entity } from 'engine/core/ecs';

describe('Component', () => {
  class MockComponent extends Component {}
  class SecondMockComponent extends Component {}

  describe('entity getter', () => {
    it('should get entity', () => {
      const component = new MockComponent();
      const entity = new Entity();
      entity.addComponent(component);

      expect(component.entity).toBe(entity);
    });

    it('should throw error if component is not added to entity', () => {
      const component = new MockComponent();

      expect(() => component.entity).toThrow(new Error('Component was not added to entity or was removed from entity'));
    });

    it('should throw error if component was removed from entity', () => {
      const component = new MockComponent();
      const entity = new Entity();
      entity.addComponent(component);
      entity.removeComponent(component);

      expect(() => component.entity).toThrow(new Error('Component was not added to entity or was removed from entity'));
    });
  });

  describe('requireComponent method', () => {
    it('should get component by type', () => {
      const component = new MockComponent();
      const secondComponent = new SecondMockComponent();
      new Entity().addComponents([component, secondComponent]);

      expect(component.requireComponent(SecondMockComponent)).toBe(secondComponent);
    });

    it('should throw error if component with type does not exist', () => {
      const component = new MockComponent();
      new Entity().addComponents([component]);

      expect(() => component.requireComponent(SecondMockComponent)).toThrow(new Error('Component SecondMockComponent is required'));
    });
  });
});
