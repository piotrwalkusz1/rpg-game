import { Position, TerrainObjectPosition } from '../../map/model/position';
import type { Character } from '../model/character';

export namespace CharacterVisionService {
  export const canCharacterSeeWhatIsHappening = (character: Character, position: Position): boolean => {
    return (
      character.position instanceof TerrainObjectPosition &&
      position instanceof TerrainObjectPosition &&
      character.position.terrainObject === position.terrainObject
    );
  };

  export const getAllCharactersSeenByCharacter = (character: Character): readonly Character[] => {
    return (character.position instanceof TerrainObjectPosition && character.position.characters.getArray()) || [];
  };

  export const isCharacterSeenByCharacter = (observed: Character, observator: Character): boolean => {
    return (
      observed.position instanceof TerrainObjectPosition &&
      observator.position instanceof TerrainObjectPosition &&
      observed.position.terrainObject === observator.position.terrainObject
    );
  };

  export const canCharactersTalk = (firstCharacter: Character, secondCharacter: Character): boolean => {
    return firstCharacter.position instanceof TerrainObjectPosition && Position.areEqual(firstCharacter.position, secondCharacter.position);
  };
}
