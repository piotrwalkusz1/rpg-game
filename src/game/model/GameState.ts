import { Character } from '../../character/model/Character';
import { Player } from './Player';
import { MapLocation } from '../../map/model/MapLocation';

export class GameState {
  constructor(readonly player: Player, readonly world: MapLocation, readonly characters: Array<Character>) {}
}
