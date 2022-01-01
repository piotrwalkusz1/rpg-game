import { Character } from '../../character/model/character';
import { Race } from '../../character/model/race';
import { MapFieldType } from '../../map/model/map-field-type';
import { MapLocation } from '../../map/model/map-location';
import { FieldPosition, TerrainObjectPosition } from '../../map/model/position';
import { TerrainObject } from '../../map/terrain-object/model/terrain-object';
import { TerrainObjectType } from '../../map/terrain-object/model/terrain-object-type';
import { GameState } from '../model/game-state';
import { Player } from '../model/player';

const createRegion = (): MapLocation => new MapLocation({ name: 'Region', width: 20, height: 20, fieldType: MapFieldType.MEADOW });
const createWorld = (): MapLocation => {
  const world = new MapLocation({ name: 'World', width: 10, height: 10, fieldType: MapFieldType.LOWLANDS });
  world.fields.forEach((row) => row.forEach((field) => field.subLocations.add(createRegion())));
  return world;
};
const world = createWorld();

const locations = {
  REGION_WHERE_ALICE_LIVE: world.fields[0][0].subLocations.get(0)
};

const terrainObjects = {
  ALICE_HOUSE: new TerrainObject({ type: TerrainObjectType.HOUSE, field: locations.REGION_WHERE_ALICE_LIVE.fields[1][1] }),
  CAVE_NEAR_ALICE_HOUSE: new TerrainObject({ type: TerrainObjectType.CAVE, field: locations.REGION_WHERE_ALICE_LIVE.fields[2][1] })
};

const characters = {
  PIOTR: new Character({
    name: 'Piotr',
    race: Race.HUMAN,
    avatarUrl: 'images/character_001_avatar.png',
    position: new FieldPosition(locations.REGION_WHERE_ALICE_LIVE.fields[2][2])
  }),
  ALICE: new Character({
    name: 'Alice',
    race: Race.HUMAN,
    avatarUrl: 'images/character_002_avatar.png',
    position: new TerrainObjectPosition(terrainObjects.ALICE_HOUSE)
  })
};

const player = new Player(characters.PIOTR);

export const gameState = new GameState({ player: player, world: world });
