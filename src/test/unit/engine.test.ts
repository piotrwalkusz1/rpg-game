import { Component, Engine, Entity } from 'engine/core/ecs';

describe('Engine', () => {
  class MockComponent extends Component {}

  describe('getComponent method', () => {
    it('should return component by type from any entity', () => {
      const engine = new Engine();
      const component = new MockComponent();
      engine.addEntities([new Entity(), new Entity().addComponent(component), new Entity()]);

      expect(engine.getComponent(MockComponent)).toBe(component);
    });

    it('should return undefined if no entity has component with type', () => {
      const engine = new Engine();
      engine.addEntities([new Entity(), new Entity(), new Entity()]);

      expect(engine.getComponent(MockComponent)).toEqual(undefined);
    });
  });

  describe('requireComponent method', () => {
    it('should return component by type from any entity', () => {
      const engine = new Engine();
      const component = new MockComponent();
      engine.addEntities([new Entity(), new Entity().addComponent(component), new Entity()]);

      expect(engine.requireComponent(MockComponent)).toBe(component);
    });

    it('should throw error if no entity has component with type', () => {
      const engine = new Engine();
      engine.addEntities([new Entity(), new Entity(), new Entity()]);

      expect(() => engine.requireComponent(MockComponent)).toThrow('Component MockComponent is required');
    });
  });
});
