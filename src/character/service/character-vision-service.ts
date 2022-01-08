import { Position, TerrainObjectPosition } from '../../map/model/position';
import type { Character } from '../model/character';

export namespace CharacterVisionService {
  export const canCharactersTalk = (firstCharacter: Character, secondCharacter: Character): boolean => {
    return firstCharacter.position instanceof TerrainObjectPosition && Position.areEqual(firstCharacter.position, secondCharacter.position);
  };
}
