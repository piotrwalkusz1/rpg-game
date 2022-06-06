import type { Engine } from '../ecs';
import type { TimeEvent } from '../time';
import { GameEventQueue } from './game-event-queue';

export const addEvent = (engine: Engine, event: TimeEvent): void => {
  engine.requireComponent(GameEventQueue).addEvent(event);
};
