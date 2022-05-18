import { ActionExecutor, ActionSystem } from 'engine/core/action';
import { CommandExecutor, CommandSystem } from 'engine/core/command';
import { Engine, Entity } from 'engine/core/ecs';
import { Field, FieldObject } from 'engine/core/field';
import { GameEvent, GameEventQueue, Player } from 'engine/core/game';
import type { Image } from 'engine/core/resources';
import { Time, TimeManager, TimeSystem } from 'engine/core/time';
import { Character } from 'engine/modules/character';
import { Health } from 'engine/modules/health';
import { MovementSystem } from 'engine/modules/movement';

export class MockEngine extends Engine {
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

  addActionExecutor(): ActionExecutor {
    const entity = new Entity().addComponent(new ActionExecutor());
    this.addEntity(entity);
    return entity.requireComponent(ActionExecutor);
  }

  addPlayer(params?: { field?: Field }): Player {
    return this.addCharacter(params).addComponent(new Player()).requireComponent(Player);
  }

  withPlayer(): MockEngine {
    this.addPlayer();
    return this;
  }

  addCharacter(params?: { field?: Field; name?: string; avatar?: Image }): Entity {
    const entity = new Entity()
      .addComponent(new Character({ name: { literal: params?.name || '' }, avatar: params?.avatar || '/images/characters/001_Eladin.png' }))
      .addComponent(new ActionExecutor())
      .addComponent(new CommandExecutor())
      .addComponent(new Health())
      .addComponent(new FieldObject({ field: params?.field }));
    this.addEntity(entity);
    return entity;
  }
}
