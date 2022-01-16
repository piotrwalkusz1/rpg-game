import type { MapLocation } from '../../map/model/map-location';
import type { Position } from '../../map/model/position';
import { TimeAxis } from '../../time/model/time-axis';
import type { Player } from './player';

export class WorldState {
  readonly player: Player;
  readonly world: MapLocation;
  currentTime: Date = new Date(2000, 5, 1, 8, 0, 0, 0);
  readonly timeAxis: TimeAxis = new TimeAxis();

  constructor({ player, world }: { player: Player; world: MapLocation }) {
    this.player = player;
    this.world = world;
  }

  getPlayerPosition(): Position | undefined {
    return this.player.character.position;
  }
}
