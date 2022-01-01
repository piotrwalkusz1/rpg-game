import type { MapField } from '../../map/model/map-field';
import type { MapLocation } from '../../map/model/map-location';
import type { Player } from './player';

export class GameState {
  readonly player: Player;
  readonly world: MapLocation;
  locationView: MapLocation;
  selectedField?: MapField;

  constructor({ player, world }: { player: Player; world: MapLocation }) {
    this.player = player;
    this.world = world;
    this.locationView = player.character.field?.location || world;
  }
}
