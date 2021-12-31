import { createOneToManyRelationship, OneToManyCollection } from '../../common/cache-relationship-utils';
import type { Position } from '../../map/model/position';
import type { Character } from './character';

export class CharactersContainer extends OneToManyCollection<Character> {
  private static readonly CHARACTERS_RELATIONSHIP = createOneToManyRelationship<CharactersContainer, Character, Position>({
    getChildren: (charactersContainer) => charactersContainer._characters,
    getParent: (character) => character.position?.characters,
    setForeignKey: (character, newPosition) => (character.position = newPosition),
    prepareForeignKey: (characterContainer) => characterContainer.defaultPosition
  });

  private readonly _characters: Character[] = [];
  private readonly defaultPosition: Position;

  constructor(defaultPosition: Position) {
    super();
    this.defaultPosition = defaultPosition;
  }

  add(character: Character) {
    CharactersContainer.CHARACTERS_RELATIONSHIP.addChild(this, character);
  }

  remove(character: Character) {
    CharactersContainer.CHARACTERS_RELATIONSHIP.removeChild(this, character);
  }
}
