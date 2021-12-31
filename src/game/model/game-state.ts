import type { MapLocation } from '../../map/model/map-location';
import type { Player } from './player';

export class GameState {
  readonly player: Player;
  readonly world: MapLocation;
  currentLocationView: MapLocation;

  constructor({ player, world }: { player: Player; world: MapLocation }) {
    this.player = player;
    this.world = world;
    this.currentLocationView = player.character.field?.location || world;
  }
}
