import type { TranslatableText } from '../../../../i18n/translatable-text';
import type { Character } from '../../character/model/character';

export type TerrainObjectPlacementId = `OUTSIDE` | `INSIDE` | `NEAR`;

export class TerrainObjectPlacement {
  static readonly OUTSIDE = new TerrainObjectPlacement('OUTSIDE');
  static readonly INSIDE = new TerrainObjectPlacement('INSIDE');
  static readonly NEAR = new TerrainObjectPlacement('NEAR');

  constructor(readonly id: TerrainObjectPlacementId) {}

  getMovementActivityName(): TranslatableText {
    return `MAP.TERRAIN_OBJECT_PLACEMENT.${this.id}.MOVEMENT_ACTIVITY`;
  }

  getCharacterDescription(character: Character): TranslatableText {
    return {
      translationKey: `MAP.TERRAIN_OBJECT_PLACEMENT.${this.id}.CHARACTER_DESCRIPTION`,
      properties: {
        characterName: character.displayName
      }
    };
  }
}
