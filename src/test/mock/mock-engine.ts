import { ActionExecutor, ActionSystem } from 'engine/core/action';
import { ActivityParticipant } from 'engine/core/activity';
import { ActivitySystem } from 'engine/core/activity/activity-system';
import { CommandExecutor, CommandSystem } from 'engine/core/command';
import { Entity } from 'engine/core/ecs';
import { Field, FieldObject } from 'engine/core/field';
import { GameEngine, GameEvent, GameEventQueue, Player } from 'engine/core/game';
import type { Image } from 'engine/core/resources';
import { TimeSystem } from 'engine/core/time';
import { Character } from 'engine/modules/character';
import { Health } from 'engine/modules/health';
import { JournalOwner } from 'engine/modules/journal';
import { MovementSystem } from 'engine/modules/movement';
import { OfferParty } from 'engine/modules/offer';

export class MockEngine extends GameEngine {
  constructor() {
    super();
    this.addSystem(new ActionSystem());
    this.addSystem(new CommandSystem());
    this.addSystem(new TimeSystem());
    this.addSystem(new MovementSystem());
    this.addSystem(new ActivitySystem());
  }

  get events(): readonly GameEvent[] {
    return this.requireComponent(GameEventQueue).events;
  }

  addActivityParticipant(): ActivityParticipant {
    const entity = new Entity().addComponent(new ActivityParticipant());
    this.addEntity(entity);
    return entity.requireComponent(ActivityParticipant);
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

  addOfferParty(): OfferParty {
    const entity = new Entity().addComponent(new OfferParty());
    this.addEntity(entity);
    return entity.requireComponent(OfferParty);
  }

  addJournalOwner(): JournalOwner {
    const entity = new Entity().addComponent(new JournalOwner());
    this.addEntity(entity);
    return entity.requireComponent(JournalOwner);
  }

  addPlayer(params?: { field?: Field }): Player {
    return this.addCharacter(params).addComponent(new Player()).addComponent(new JournalOwner()).requireComponent(Player);
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
      .addComponent(new OfferParty())
      .addComponent(new ActivityParticipant())
      .addComponent(new FieldObject({ field: params?.field }));
    this.addEntity(entity);
    return entity;
  }
}
