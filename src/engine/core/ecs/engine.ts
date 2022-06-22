import { ArrayUtils, Type, typeName } from 'utils';
import type { Component } from './component';
import type { ECSEvent } from './ecs-event';
import { Entity } from './entity';
import type { EntityEventListener } from './entity-event-listener';
import type { EntityEventListenerExecutor } from './entity-event-listener-executor';
import type { System } from './system';

export class Engine {
  private readonly entities: Entity[] = [];
  private readonly systems: System[] = [];
  private readonly entityEventListenerExecutors: EntityEventListenerExecutor<EntityEventListener>[] = [];

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

  addSystem(system: System): void {
    this.systems.push(system);
  }

  addSystems(systems: readonly System[]): void {
    this.systems.push(...systems);
  }

  removeSystem(system: System): void {
    ArrayUtils.removeFirst(this.systems, system);
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
      this.entities.flatMap((entity) => entity.components),
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

  addEntityEventListenerExecutors(entityEventListenerExecutors: EntityEventListenerExecutor<EntityEventListener>[]): void {
    this.entityEventListenerExecutors.push(...entityEventListenerExecutors);
  }

  async processEvent(event: ECSEvent): Promise<void> {
    const systems = [...this.systems];
    for (const system of systems) {
      await system.processEvent(event, this);
    }
    for (const entity of event.entities) {
      const eventListeners = entity.eventListeners;
      for (const eventListener of eventListeners) {
        const eventListenerExecutor = this.getEntityEventListenerExecutor(eventListener);
        await eventListenerExecutor.processEvent({ event, eventListener, entity, engine: this });
      }
    }
  }

  private getEntityEventListenerExecutor<T extends EntityEventListener>(eventListener: T): EntityEventListenerExecutor<T> {
    const eventListenerExecutor = this.entityEventListenerExecutors.filter(
      (executor) => eventListener instanceof executor.eventListenerType
    )[0];
    if (!eventListenerExecutor) {
      throw new Error('EntityEventListenerExecutor for type ' + typeName(eventListener) + ' not found');
    }
    return eventListenerExecutor;
  }
}
