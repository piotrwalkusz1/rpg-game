import { ArrayUtils, Type } from 'utils';
import type { Component, ECSEvent, Entity, System } from '.';

export class Engine {
  private readonly entities: Entity[] = [];
  private readonly systems: System[] = [];

  getEntities(): readonly Entity[] {
    return this.entities;
  }

  addEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  addEntities(entities: readonly Entity[]): void {
    this.entities.push(...entities);
  }

  getSystems(): readonly System[] {
    return this.systems;
  }

  addSystem(system: System): void {
    this.systems.push(system);
  }

  addSystems(systems: readonly System[]): void {
    this.systems.push(...systems);
  }

  getComponent<T extends Component>(componentType: Type<T>): T | undefined {
    for (const entity of this.entities) {
      const component = entity.getComponent(componentType);
      if (component) {
        return component;
      }
    }
    return undefined;
  }

  getComponents<T extends Component>(componentType: Type<T>): T[] {
    return ArrayUtils.filterInstanceOf(
      this.entities.flatMap((entity) => entity.getComponents()),
      componentType
    );
  }

  requireComponent<T extends Component>(componentType: Type<T>): T {
    const component: T | undefined = this.getComponent(componentType);
    if (!component) {
      throw new Error('Component ' + componentType.name + ' is required');
    }
    return component;
  }

  async processEvent(event: ECSEvent): Promise<void> {
    for (const system of this.systems) {
      await system.processEvent(event, this);
    }
  }
}
