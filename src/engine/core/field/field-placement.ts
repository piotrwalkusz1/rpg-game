import type { TranslatableText } from 'i18n/translatable-text';

export type FieldPlacementId = `OUTSIDE` | `INSIDE` | `NEAR`;

export class FieldPlacement {
  static readonly OUTSIDE = new FieldPlacement('OUTSIDE');
  static readonly INSIDE = new FieldPlacement('INSIDE');
  static readonly NEAR = new FieldPlacement('NEAR');

  constructor(readonly id: FieldPlacementId) {}

  getMovementActivityName(): TranslatableText {
    return `MAP.TERRAIN_OBJECT_PLACEMENT.${this.id}.MOVEMENT_ACTIVITY`;
  }
}
