import { ActionExecutor, ActionSystem } from 'engine/core/action';
import { CommandExecutor, CommandSystem } from 'engine/core/command';
import { Engine, Entity } from 'engine/core/ecs';
import { Field, FieldObject } from 'engine/core/field';
import { GameEvent, GameEventQueue, Player } from 'engine/core/game';
import { Time, TimeManager, TimeSystem } from 'engine/core/time';
import { Health } from 'engine/modules/health';
import { MovementSystem } from 'engine/modules/movement';

export class MockedEngine extends Engine {
  constructor() {
    super();
    this.addEntity(new Entity().addComponent(new GameEventQueue()).addComponent(new TimeManager(new Date(812, 6, 12, 8))));
    this.addSystem(new ActionSystem());
    this.addSystem(new CommandSystem());
    this.addSystem(new TimeSystem());
    this.addSystem(new MovementSystem());
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

  addPlayer(params?: { field?: Field }): Player {
    return this.addCharacter(params).addComponent(new Player()).requireComponent(Player);
  }

  withPlayer(): MockedEngine {
    this.addPlayer();
    return this;
  }

  addCharacter(params?: { field?: Field }): Entity {
    const entity = new Entity()
      .addComponent(new ActionExecutor())
      .addComponent(new CommandExecutor())
      .addComponent(new Health())
      .addComponent(new FieldObject({ field: params?.field }));
    this.addEntity(entity);
    return entity;
  }
}
