import { ArrayUtils, Type } from 'utils';
import type { Component } from './component';
import type { ECSEvent } from './ecs-event';
import { Entity } from './entity';
import type { System } from './system';

export class Engine {
  private readonly entities: Entity[] = [];
  private readonly systems: System[] = [];

  getEntities(): readonly Entity[] {
    return this.entities;
  }

  addEntityWithComponent<T extends Component>(component: T): T {
    this.addEntity(new Entity().addComponent(component));
    return component;
  }

  addEntityWithComponents(components: Component[]): Entity {
    return this.addEntity(new Entity().addComponents(components));
  }

  addEntity(entity: Entity): Entity {
    this.entities.push(entity);
    return entity;
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
