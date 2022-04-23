import type { Component, ECSEvent, Entity, System } from 'engine/core/ecs';

export class Engine {
  private readonly entities: Entity[] = [];
  private readonly systems: System[] = [];

  getEntities(): readonly Entity[] {
    return this.entities;
  }

  addEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  getSystems(): readonly System[] {
    return this.systems;
  }

  addSystem(system: System): void {
    this.systems.push(system);
  }

  getComponent<T extends Component>(componentType: abstract new (...args: any[]) => T): T | undefined {
    for (const entity of this.entities) {
      const component = entity.getComponent(componentType);
      if (component) {
        return component;
      }
    }
    return undefined;
  }

  async processEvent(event: ECSEvent): Promise<void> {
    for (const system of this.systems) {
      await system.processEvent(event, this);
    }
  }
}
