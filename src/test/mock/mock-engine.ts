import { ActionExecutor } from 'engine/core/action';
import { CommandExecutor } from 'engine/core/command';
import { Engine, Entity } from 'engine/core/ecs';
import { GameEvent, GameEventQueue } from 'engine/core/game';
import { Time, TimeManager } from 'engine/core/time';

export class MockedEngine extends Engine {
  constructor() {
    super();
    this.addEntity(new Entity().addComponent(new GameEventQueue()).addComponent(new TimeManager(new Date(812, 6, 12, 8))));
  }

  get time(): Time {
    return this.requireComponent(TimeManager).time;
  }

  get events(): readonly GameEvent[] {
    return this.requireComponent(GameEventQueue).events;
  }

  addCommandExecutor(): CommandExecutor {
    const entity = new Entity().addComponent(new ActionExecutor()).addComponent(new CommandExecutor());
    this.addEntity(entity);
    return entity.requireComponent(CommandExecutor);
  }
}
