import type { Type } from 'utils';
import type { ECSEvent } from './ecs-event';
import type { Engine } from './engine';
import type { Entity } from './entity';
import type { EntityEventListener } from './entity-event-listener';

export type EntityEventListenerExecutorParams<T extends EntityEventListener> = {
  event: ECSEvent;
  eventListener: T;
  entity: Entity;
  engine: Engine;
};

export abstract class EntityEventListenerExecutor<T extends EntityEventListener> {
  abstract get eventListenerType(): Type<EntityEventListener>;

  abstract processEvent(params: EntityEventListenerExecutorParams<T>): Promise<void>;
}
