import { Character } from '../../character/model/Character';
import { MapLocation } from '../../map/model/MapLocation';
import { Player } from './Player';

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
