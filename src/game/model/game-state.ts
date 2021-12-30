import type { Character } from '../../character/model/character';
import type { MapLocation } from '../../map/model/map-location';
import type { Player } from './player';

export class GameState {
  readonly player: Player;
  readonly world: MapLocation;
  readonly characters: Array<Character>;
  currentLocationView: MapLocation;

  constructor({ player, world, characters }: { player: Player; world: MapLocation; characters: Array<Character> }) {
    this.player = player;
    this.world = world;
    this.characters = characters;
    this.currentLocationView = player.character.field?.location || world;
  }
}
