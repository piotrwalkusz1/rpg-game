import type { Position } from '../../map/model/position';
import { TerrainObjectPosition } from '../../map/model/position';
import type { Character } from '../model/character';

export namespace CharacterVisionService {
  export const canCharacterSeeWhatIsHappening = (character: Character, position: Position): boolean => {
    return (
      character.position instanceof TerrainObjectPosition &&
      position instanceof TerrainObjectPosition &&
      character.position.terrainObject === position.terrainObject
    );
  };
}
