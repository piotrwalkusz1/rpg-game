import { ActionExecutor, ActionSystem } from 'engine/core/action';
import { ActivityParticipant } from 'engine/core/activity';
import { AIActionExecutor } from 'engine/core/ai';
import { CommandExecutor, CommandSystem } from 'engine/core/command';
import { Entity } from 'engine/core/ecs';
import { Field, FieldObject, RectFieldPosition, subFieldAt } from 'engine/core/field';
import { FieldDefinition } from 'engine/core/field/field-definition';
import { GameEngine, Player } from 'engine/core/game';
import type { Image } from 'engine/core/resources';
import { TimeSystem } from 'engine/core/time';
import { Character } from 'engine/modules/character';
import { Health } from 'engine/modules/health';
import { InteractionExecutor } from 'engine/modules/interaction';
import { JournalOwner } from 'engine/modules/journal';
import { JournalSpeakingSystem } from 'engine/modules/journal-speaking';
import { MovementSystem } from 'engine/modules/movement';
import { OfferParty, OfferSystem } from 'engine/modules/offer';
import { TalkSystem } from 'engine/modules/talk';

export interface GameBuilderCharacter {
  name?: string;
  avatar?: Image;
  position?: [number, number];
}

export class GameBuilder {
  private _worldSize: [number, number] = [5, 5];
  private _playerPosition: [number, number] = [0, 0];
  private _characters: GameBuilderCharacter[] = [];

  worldSize(worldSize: [number, number]): GameBuilder {
    this._worldSize = worldSize;
    return this;
  }

  playerPosition(playerPosition: [number, number]): GameBuilder {
    this._playerPosition = playerPosition;
    return this;
  }

  addCharacter(character?: GameBuilderCharacter): GameBuilder {
    this._characters.push(character || {});
    return this;
  }

  build(): GameEngine {
    const world = this.buildWorld();
    const engine: GameEngine = new GameEngine();
    engine.addEntities([world, this.buildPlayer(world), ...this.buildCharacters(world)]);
    engine.addSystems([
      new TimeSystem(),
      new ActionSystem(),
      new CommandSystem(),
      new MovementSystem(),
      new JournalSpeakingSystem(),
      new TalkSystem(),
      new OfferSystem()
    ]);
    return engine;
  }

  private buildWorld(): Entity {
    return new Entity().addComponent(this.buildRectField(this._worldSize[0], this._worldSize[1]));
  }

  private buildPlayer(world: Entity): Entity {
    const player: Entity = this.buildCharacter({
      name: 'Eladin',
      avatar: '/images/characters/001_Eladin.png',
      field: subFieldAt(world, this._playerPosition),
      aiEnabled: false
    });
    player.addComponent(new Player());
    player.addComponent(new JournalOwner());
    return player;
  }

  private buildCharacters(world: Entity): Entity[] {
    return this._characters.map(({ name, avatar, position }) =>
      this.buildCharacter({
        name: name || 'Eladin',
        avatar: avatar || '/images/characters/001_Eladin.png',
        field: subFieldAt(world, position || [0, 0]),
        aiEnabled: true
      })
    );
  }

  private buildCharacter({ name, avatar, field, aiEnabled }: { name: string; avatar: Image; field: Field; aiEnabled: boolean }): Entity {
    const character: Entity = new Entity();
    character.addComponent(new Character({ name: { literal: name }, avatar }));
    character.addComponent(new FieldObject({ field }));
    character.addComponent(new ActionExecutor());
    character.addComponent(new CommandExecutor());
    character.addComponent(new Health());
    character.addComponent(new OfferParty());
    character.addComponent(new ActivityParticipant());
    character.addComponent(new InteractionExecutor());
    if (aiEnabled) {
      character.addComponent(new AIActionExecutor());
    }
    return character;
  }

  private buildRectField(width: number, height: number): Field {
    const field: Field = new Field({ definition: FieldDefinitions.WORLD });
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        new Field({
          definition: FieldDefinitions.GRASS,
          position: new RectFieldPosition(field, x, y)
        });
      }
    }
    return field;
  }
}

const FieldDefinitions = {
  WORLD: new FieldDefinition({ name: { literal: '' } }),
  GRASS: new FieldDefinition({ name: 'FIELD.GRASS.NAME', description: 'FIELD.GRASS.DESCRIPTION', image: '/images/fields/grass.jpg' })
};
