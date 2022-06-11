import { ActionSystem } from 'engine/core/action';
import { AI } from 'engine/core/ai';
import { CommandSystem } from 'engine/core/command';
import { Entity } from 'engine/core/ecs';
import { Field, RectFieldPosition, subFieldAt } from 'engine/core/field';
import { FieldDefinition } from 'engine/core/field/field-definition';
import { GameEngine } from 'engine/core/game';
import type { Image } from 'engine/core/resources';
import { Character } from 'engine/modules/character';
import { JournalSpeakingSystem } from 'engine/modules/journal-speaking';
import { MovementSystem } from 'engine/modules/movement';
import { OfferSystem } from 'engine/modules/offer';
import { TalkSystem } from 'engine/modules/talk';
import { Player } from './player';

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
    engine.addEntity(world);
    this.createPlayer(world, engine);
    this.createCharacters(world, engine);
    engine.addSystems([
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

  private createPlayer(world: Entity, engine: GameEngine): Player {
    const player = Player.create(engine);
    this.setCharacterData(player.character, {
      name: 'Eladin',
      avatar: '/images/characters/001_Eladin.png',
      field: subFieldAt(world, this._playerPosition),
      aiEnabled: false
    });
    return player;
  }

  private createCharacters(world: Entity, engine: GameEngine): void {
    this._characters.forEach(({ name, avatar, position }) =>
      this.createCharacter(
        {
          name: name || 'Eladin',
          avatar: avatar || '/images/characters/001_Eladin.png',
          field: subFieldAt(world, position || [0, 0]),
          aiEnabled: true
        },
        engine
      )
    );
  }

  private createCharacter(characterData: { name: string; avatar: Image; field: Field; aiEnabled: boolean }, engine: GameEngine): Character {
    const character = Character.create(engine);
    this.setCharacterData(character, characterData);
    return character;
  }

  private setCharacterData(
    character: Character,
    { name, avatar, field, aiEnabled }: { name: string; avatar: Image; field: Field; aiEnabled: boolean }
  ) {
    character.name = { literal: name };
    character.avatar = avatar;
    character.field = field;
    if (aiEnabled) {
      character.entity.addComponent(new AI({ character }));
    }
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
