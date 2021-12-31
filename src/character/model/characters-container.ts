import { OneToManyCollection } from '../../common/cache-relationship-utils';
import type { Position } from '../../map/model/position';
import type { Character } from './character';

export class CharactersCollection extends OneToManyCollection<Character, Position> {
  private readonly defaultPosition: Position;

  constructor(defaultPosition: Position) {
    super();
    this.defaultPosition = defaultPosition;
  }

  override getCollectionByItem(character: Character): OneToManyCollection<Character, Position> | undefined {
    return character.position?.characters;
  }

  override prepareForeignKey(): Position {
    return this.defaultPosition;
  }

  override setForeignKey(character: Character, position: Position | undefined): void {
    character.position = position;
  }
}
