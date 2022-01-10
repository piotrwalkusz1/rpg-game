import type { GameState } from '../../../game/model/game-state';
import type { TranslatableText } from '../../../i18n/translatable-text';
import type { MapField } from '../../../map/model/map-field';
import { TerrainObjectPosition } from '../../../map/model/position';
import type { TerrainObject } from '../../../map/terrain-object/model/terrain-object';
import { VisionService } from '../../../trait/vision/service/vision-service';
import { AttackNarrationAction } from '../../model/narration-actions/attack-narration-action';
import { ChangeTerrainObjectPlacementNarrationAction } from '../../model/narration-actions/change-terrain-object-placement-narration-action';
import { GoToTerrainObjectNarrationAction } from '../../model/narration-actions/go-to-terrain-object-narration-action';
import { LeaveTerrainObjectNarrationAction } from '../../model/narration-actions/leave-terrain-object-narration-action';
import type { NarrationAction } from '../../model/narration-actions/narration-action';
import type { TemplateNarrationAction } from '../../model/narration-actions/template-narration-action';
import { NarrationProvider } from './narration-provider';

interface Data {
  terrainObjects: readonly TerrainObject[];
}

export class TerrainObjectNarrationProvider extends NarrationProvider<Data> {
  override getDataIfSupported(field: MapField): Data | undefined {
    return field.terrainObjects.length > 0 ? { terrainObjects: field.terrainObjects.getArray() } : undefined;
  }

  override getDescription({ terrainObjects }: Data, gameState: GameState): { description: TranslatableText; order: number }[] {
    const terrainObjectWherePlayerIs = terrainObjects.find((terrainObject) =>
      gameState.player.character.isNearTerrainObject(terrainObject)
    );
    if (!terrainObjectWherePlayerIs) {
      return [];
    }
    return terrainObjectWherePlayerIs.characters
      .getArray()
      .filter((character) => character !== gameState.player.character)
      .map(
        (character) =>
          character.position instanceof TerrainObjectPosition &&
          VisionService.isVisible(character, gameState.player.character) &&
          character.position.placement.getCharacterDescription(character)
      )
      .flatMap((description) => (description ? [{ description, order: 100 }] : []));
  }

  override getActions({ terrainObjects }: Data, gameState: GameState): NarrationAction[] {
    return terrainObjects.flatMap((terrainObject) => this.prepareActionsForTerrainObject(terrainObject, gameState));
  }

  private prepareActionsForTerrainObject(terrainObject: TerrainObject, gameState: GameState): NarrationAction[] {
    return [
      ...this.prepareStoryActions(terrainObject, gameState),
      this.prepareGoAction(terrainObject, gameState),
      this.prepareLeaveAction(terrainObject, gameState),
      ...this.prepareChangeTerrainObjectPlacementActions(terrainObject, gameState),
      ...this.prepareAttackActions(terrainObject, gameState)
    ].flatMap((action) => (action ? [action] : []));
  }

  private prepareGoAction(terrainObject: TerrainObject, gameState: GameState): TemplateNarrationAction | undefined {
    if (
      gameState.player.character.isNearTerrainObject(terrainObject) ||
      !VisionService.isLocatable(terrainObject, gameState.player.character)
    ) {
      return;
    }
    return new GoToTerrainObjectNarrationAction(terrainObject);
  }

  private prepareLeaveAction(terrainObject: TerrainObject, gameState: GameState): TemplateNarrationAction | undefined {
    if (!gameState.player.character.isNearTerrainObject(terrainObject)) {
      return;
    }
    return new LeaveTerrainObjectNarrationAction(terrainObject);
  }

  private prepareChangeTerrainObjectPlacementActions(terrainObject: TerrainObject, gameState: GameState): TemplateNarrationAction[] {
    if (!gameState.player.character.isNearTerrainObject(terrainObject)) {
      return [];
    }
    const playerTerrrainPositionPlacement =
      gameState.player.character.position instanceof TerrainObjectPosition && gameState.player.character.position.placement;
    return terrainObject.type.placements
      .filter((placement) => placement !== playerTerrrainPositionPlacement)
      .map((placement) => new ChangeTerrainObjectPlacementNarrationAction(terrainObject, placement));
  }

  private prepareAttackActions(terrainObject: TerrainObject, gameState: GameState): TemplateNarrationAction[] {
    if (!gameState.player.character.isNearTerrainObject(terrainObject)) {
      return [];
    }
    return terrainObject.characters
      .getArray()
      .filter((character) => character !== gameState.player.character)
      .filter((character) => VisionService.isVisible(character, gameState.player.character))
      .map((character) => new AttackNarrationAction(character));
  }

  private prepareStoryActions(terrainObject: TerrainObject, gameState: GameState): NarrationAction[] {
    if (!gameState.player.character.isNearTerrainObject(terrainObject)) {
      return [];
    }
    return terrainObject.characters
      .getArray()
      .filter((character) => character !== gameState.player.character)
      .flatMap((character) => character.stories.flatMap((story) => story.getNarrationActions()));
  }
}
