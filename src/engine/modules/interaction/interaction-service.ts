import type { Engine } from 'engine/core/ecs';
import { GameEventQueue } from 'engine/core/game';
import { Time, TimeManager } from 'engine/core/time';
import type { Character } from '../character';
import type { Interaction } from './interaction';
import { InteractionEvent } from './interaction-event';

export namespace InteractionService {
  export const scheduleInteraction = (interaction: Interaction, executor: Character, engine: Engine): void => {
    const time: Time = engine.requireComponent(TimeManager).time;
    engine.requireComponent(GameEventQueue).addEvent(new InteractionEvent({ time, interaction, executor }));
  };
}
