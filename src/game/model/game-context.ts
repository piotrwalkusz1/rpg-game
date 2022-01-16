import type { Character } from '../../character/model/character';
import type { MapLocation } from '../../map/model/map-location';
import type { Position } from '../../map/model/position';
import type { TimeEvent } from '../../time/model/time-event';
import type { TraitOwner } from '../../trait/model/trait-owner';
import type { GameState } from './game-state';
import { WorldContext } from './world-context';
import type { WorldState } from './world-state';

export class GameContext extends WorldContext {
  static KEY = Symbol();

  readonly getGameState: () => GameState;
  readonly changeLocationView: (newLocationView: MapLocation) => void;

  constructor({
    getWorldState,
    changeCharacterPosition,
    addKnownLocation,
    addTimeEvent,
    popNextTimeEvent,
    setCurrentTime,
    dealDamage,
    getGameState,
    changeLocationView
  }: {
    getWorldState: () => WorldState;
    changeCharacterPosition: (character: Character, position: Position) => void;
    addKnownLocation: (character: Character, location: TraitOwner) => void;
    addTimeEvent: (timeEvent: TimeEvent) => void;
    popNextTimeEvent: () => TimeEvent | undefined;
    setCurrentTime: (time: Date) => void;
    dealDamage: (target: Character, damage: number) => void;
    getGameState: () => GameState;
    changeLocationView: (newLocationView: MapLocation) => void;
  }) {
    super({ getWorldState, changeCharacterPosition, addKnownLocation, addTimeEvent, popNextTimeEvent, setCurrentTime, dealDamage });
    this.getGameState = getGameState;
    this.changeLocationView = changeLocationView;
  }
}
