import type { Character } from '../../../character/model/character';
import { ArrayUtils } from '../../../common/array-utils';
import type { GameState } from '../../../game/model/game-state';
import { TerrainObjectPosition } from '../../../map/model/position';
import { VisionService } from '../../../trait/vision/service/vision-service';
import { AttackNarrationAction } from '../../model/narration-actions/attack-narration-action';
import type { TemplateNarrationAction } from '../../model/narration-actions/template-narration-action';
import type { NarrationProvider } from '../../model/narration-provider/narration-provider';
import type { NarrationProviderResult } from '../../model/narration-provider/narration-provider-result';

export namespace CharacterNarrationProvider {
  export const create =
    (character: Character): NarrationProvider =>
    ({ trigger, gameState }): NarrationProviderResult | undefined => {
      if (character === gameState.player.character || !(character.position instanceof TerrainObjectPosition)) {
        return;
      }
      const terrainObject = character.position.terrainObject;
      if (
        trigger.type !== 'SELECTED_FIELD' ||
        !terrainObject ||
        !trigger.field.terrainObjects.getArray().includes(terrainObject) ||
        !gameState.player.character.isNearTerrainObject(terrainObject) ||
        gameState.player.character === character ||
        !VisionService.isVisible(character, gameState.player.character)
      ) {
        return;
      }
      return {
        descriptions: [{ value: character.position.placement.getCharacterDescription(character), order: 100 }],
        actions: ArrayUtils.filterNotNull([getAttackAction(character, gameState)])
      };
    };

  const getAttackAction = (character: Character, gameState: GameState): TemplateNarrationAction | undefined => {
    if (
      gameState.player.character !== character &&
      gameState.player.character.position instanceof TerrainObjectPosition &&
      character.position instanceof TerrainObjectPosition &&
      character.position.terrainObject === gameState.player.character.position.terrainObject &&
      VisionService.isVisible(character, gameState.player.character)
    ) {
      return new AttackNarrationAction(character);
    }
  };
}
