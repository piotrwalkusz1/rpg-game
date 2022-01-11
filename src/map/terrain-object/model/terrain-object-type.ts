import type { TranslatableText } from '../../../i18n/translatable-text';
import { TerrainObjectPlacement } from './terrain-object-placement';

export type TerrainObjectTypeId = 'HOUSE' | 'CAVE' | 'HIDDEN_TREASURE';

export class TerrainObjectType {
  static readonly HOUSE = new TerrainObjectType({
    id: 'HOUSE',
    imageUrl: 'images/house.png',
    placements: [TerrainObjectPlacement.OUTSIDE, TerrainObjectPlacement.INSIDE],
    defaultCharacterPlacement: TerrainObjectPlacement.OUTSIDE
  });
  static readonly CAVE = new TerrainObjectType({
    id: 'CAVE',
    imageUrl: 'images/terrain-objects/natural/cave.svg',
    placements: [TerrainObjectPlacement.OUTSIDE, TerrainObjectPlacement.INSIDE],
    defaultCharacterPlacement: TerrainObjectPlacement.OUTSIDE
  });
  static readonly HIDDEN_TREASURE = new TerrainObjectType({
    id: 'HIDDEN_TREASURE',
    imageUrl: 'images/terrain-objects/treasure_chest.png',
    placements: [TerrainObjectPlacement.NEAR],
    defaultCharacterPlacement: TerrainObjectPlacement.NEAR
  });

  readonly id: TerrainObjectTypeId;
  readonly imageUrl: string;
  readonly placements: TerrainObjectPlacement[];
  readonly defaultCharacterPlacement: TerrainObjectPlacement;

  constructor({
    id,
    imageUrl,
    placements,
    defaultCharacterPlacement
  }: {
    id: TerrainObjectTypeId;
    imageUrl: string;
    placements: TerrainObjectPlacement[];
    defaultCharacterPlacement: TerrainObjectPlacement;
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
    return `MAP.TERRAIN_OBJECT.${this.id}`;
  }

  get description(): TranslatableText {
    return `MAP.TERRAIN_OBJECT.${this.id}.DESCRIPTION`;
  }
}
