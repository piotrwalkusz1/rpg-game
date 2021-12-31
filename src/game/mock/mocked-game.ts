import { Character } from '../../character/model/character';
import { Race } from '../../character/model/race';
import { MapFieldType } from '../../map/model/map-field-type';
import { MapLocation } from '../../map/model/map-location';
import { TerrainObject } from '../../map/terrain-object/model/terrain-object';
import { TerrainObjectPlacementType } from '../../map/terrain-object/model/terrain-object-placement-type';
import { TerrainObjectType } from '../../map/terrain-object/model/terrain-object-type';
import { GameState } from '../model/game-state';
import { Player } from '../model/player';

const createRegion = (): MapLocation => new MapLocation({ name: 'Region', width: 20, height: 20, fieldType: MapFieldType.MEADOW });
const createWorld = (): MapLocation => {
  const world = new MapLocation({ name: 'World', width: 10, height: 10, fieldType: MapFieldType.LOWLANDS });
  world.fields.forEach((row) => row.forEach((field) => field.addSubLocation(createRegion())));
  return world;
};
const world = createWorld();

const locations = {
  WORLD: world,
  ALICE_PARCEL: new MapLocation({
    name: "Alice's parcel",
    width: 3,
    height: 3,
    fieldType: MapFieldType.GRASS,
    parentField: world.fields[0][0].subLocations[0].fields[0][0]
  })
};

const characters = {
  PIOTR: new Character({
    name: 'Piotr',
    race: Race.HUMAN,
    avatarUrl: 'images/character_001_avatar.png',
    field: locations.ALICE_PARCEL.fields[1][1]
  }),
  ALICE: new Character({
    name: 'Alice',
    race: Race.HUMAN,
    avatarUrl: 'images/character_002_avatar.png',
    field: locations.ALICE_PARCEL.fields[1][1]
  })
};

const buildingTypes = {
  HOUSE: new TerrainObjectType({
    id: 'HOUSE',
    imageUrl: 'images/house.png',
    placements: [TerrainObjectPlacementType.OUTSIDE, TerrainObjectPlacementType.INSIDE],
    defaultCharacterPlacement: TerrainObjectPlacementType.OUTSIDE
  })
};

new TerrainObject({ type: buildingTypes.HOUSE, field: locations.ALICE_PARCEL.fields[1][1], guards: [characters.ALICE] });

const player = new Player(characters.PIOTR);

export const gameState = new GameState({ player: player, world: world, characters: [characters.PIOTR, characters.ALICE] });
