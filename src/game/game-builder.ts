import { ActionSystem } from 'engine/core/action';
import { AI, AISystem } from 'engine/core/ai';
import { CommandSystem } from 'engine/core/command';
import { Entity } from 'engine/core/ecs';
import { Field, RectFieldPosition, rootField, subFieldAt } from 'engine/core/field';
import { FieldDefinition } from 'engine/core/field/field-definition';
import { GameEngine } from 'engine/core/game';
import type { Image } from 'engine/core/resources';
import { Character } from 'engine/modules/character';
import { JournalSpeakingSystem } from 'engine/modules/journal-extensions/journal-speaking';
import { TalkJournalSystem } from 'engine/modules/journal-extensions/journal-talk';
import { MovementSystem } from 'engine/modules/movement';
import { OfferSystem } from 'engine/modules/offer';
import { TalkSystem } from 'engine/modules/talk';
import { Player } from './player';

interface CharacterData {
  name?: string;
  avatar?: Image;
  position?: [number, number];
  aiDisabled?: boolean;
}

export class GameBuilder {
  private _worldSize: [number, number] = [5, 5];
  private _playerPosition: [number, number] = [0, 0];
  private _characters: CharacterData[] = [];

  static createCharacter(engine: GameEngine, characterData?: CharacterData): Character {
    const character = Character.create(engine);
    GameBuilder.fillCharacterData(engine, character, characterData);
    return character;
  }

  private static fillCharacterData(engine: GameEngine, character: Character, characterData?: CharacterData) {
    characterData = characterData || {};
    character.name = { literal: characterData.name || 'Eladin' };
    character.avatar = characterData.avatar || '/images/characters/001_Eladin.png';
    character.field = subFieldAt(rootField(engine), characterData.position || [0, 0]);
    if (characterData.aiDisabled !== true) {
      character.entity.addComponent(new AI({ character }));
    }
  }

  playerPosition(playerPosition: [number, number]): GameBuilder {
    this._playerPosition = playerPosition;
    return this;
  }

  addCharacter(character: CharacterData): GameBuilder {
    this._characters.push(character);
    return this;
  }

  build(): GameEngine {
    const engine = new GameEngine();
    engine.addEntity(this.createWorld());
    this.createPlayer(engine);
    this.createCharacters(engine);
    engine.addSystems([
      new ActionSystem(),
      new CommandSystem(),
      new MovementSystem(),
      new JournalSpeakingSystem(),
      new TalkJournalSystem(),
      new TalkSystem(),
      new OfferSystem(),
      new AISystem()
    ]);
    return engine;
  }

  private createWorld(): Entity {
    return new Entity().addComponent(this.buildRectField(this._worldSize[0], this._worldSize[1]));
  }

  private createPlayer(engine: GameEngine): Player {
    const player = Player.create(engine);
    GameBuilder.fillCharacterData(engine, player.character, {
      name: 'Eladin',
      avatar: '/images/characters/001_Eladin.png',
      position: this._playerPosition,
      aiDisabled: true
    });
    return player;
  }

  private createCharacters(engine: GameEngine): void {
    this._characters.forEach((characterData) => GameBuilder.createCharacter(engine, characterData));
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
