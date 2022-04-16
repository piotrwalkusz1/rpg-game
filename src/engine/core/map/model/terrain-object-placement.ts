import type { TranslatableText } from '../../../../i18n/translatable-text';
import type { Actor } from '../../actor/model/actor';

export type TerrainObjectPlacementId = `OUTSIDE` | `INSIDE` | `NEAR`;

export class TerrainObjectPlacement {
  static readonly OUTSIDE = new TerrainObjectPlacement('OUTSIDE');
  static readonly INSIDE = new TerrainObjectPlacement('INSIDE');
  static readonly NEAR = new TerrainObjectPlacement('NEAR');

  constructor(readonly id: TerrainObjectPlacementId) {}

  getMovementActivityName(): TranslatableText {
    return `MAP.TERRAIN_OBJECT_PLACEMENT.${this.id}.MOVEMENT_ACTIVITY`;
  }

  getCharacterDescription(character: Actor): TranslatableText {
    return {
      translationKey: `MAP.TERRAIN_OBJECT_PLACEMENT.${this.id}.CHARACTER_DESCRIPTION`,
      properties: {
        characterName: character.displayName
      }
    };
  }
}
