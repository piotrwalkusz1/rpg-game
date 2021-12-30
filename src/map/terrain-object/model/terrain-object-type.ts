import type { TranslatableText } from '../../../i18n/translatable-text';
import type { TerrainObjectPlacement } from './terrain-object-placement';
import type { TerrainObjectPlacementType } from './terrain-object-placement-type';

export class TerrainObjectType {
  readonly id: string;
  readonly imageUrl: string;
  readonly placements: Array<TerrainObjectPlacementType>;
  readonly defaultCharacterPlacement: TerrainObjectPlacementType;

  constructor({
    id,
    imageUrl,
    placements,
    defaultCharacterPlacement
  }: {
    id: string;
    imageUrl: string;
    placements: Array<TerrainObjectPlacementType>;
    defaultCharacterPlacement: TerrainObjectPlacementType;
  }) {
    if (placements.length === 0) {
      throw new Error('At least one placement required');
    }
    if (!placements.includes(defaultCharacterPlacement)) {
      throw new Error('Default character placement must be in placements array');
    }

    this.id = id;
    this.imageUrl = imageUrl;
    this.placements = placements;
    this.defaultCharacterPlacement = defaultCharacterPlacement;
  }

  get name(): TranslatableText {
    return { translationKey: 'MAP.TERRAIN_OBJECT.' + this.id };
  }

  get description(): TranslatableText {
    return { translationKey: 'MAP.TERRAIN_OBJECT.' + this.id + '.DESCRIPTION' };
  }

  getDescriptionForPlacement(placement: TerrainObjectPlacement): TranslatableText {
    return { translationKey: 'MAP.TERRAIN_OBJECT.' + this.id + '.PLACEMENT.' + placement.type.id + '.DESCRIPTION' };
  }
}
