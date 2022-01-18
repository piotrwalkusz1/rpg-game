import type { Character } from '../../character/model/character';
import type { MapLocation } from '../../map/model/map-location';
import type { Position } from '../../map/model/position';
import type { Narration } from '../../narration/model/narration';
import type { PendingNarrationSequence } from '../../narration/model/narration-sequence/pending-narration-sequence';
import type { TimeEvent } from '../../time/model/time-event';
import type { TraitOwner } from '../../trait/model/trait-owner';
import type { GameState } from './game-state';
import { WorldContext } from './world-context';
import type { WorldState } from './world-state';

export class GameContext extends WorldContext {
  static KEY = Symbol();

  readonly getGameState: () => GameState;
  readonly setNarration: (narration: Narration | undefined) => void;
  readonly changeLocationView: (newLocationView: MapLocation) => void;
  readonly setPendingNarrationSequence: (pendingNarrationSequence: PendingNarrationSequence | undefined) => void;

  constructor({
    getWorldState,
    changeCharacterPosition,
    addKnownLocation,
    addTimeEvent,
    popNextTimeEvent,
    setCurrentTime,
    dealDamage,
    getGameState,
    setNarration,
    changeLocationView,
    setPendingNarrationSequence
  }: {
    getWorldState: () => WorldState;
    changeCharacterPosition: (character: Character, position: Position) => void;
    addKnownLocation: (character: Character, location: TraitOwner) => void;
    addTimeEvent: (timeEvent: TimeEvent) => void;
    popNextTimeEvent: () => TimeEvent | undefined;
    setCurrentTime: (time: Date) => void;
    dealDamage: (target: Character, damage: number) => void;
    getGameState: () => GameState;
    setNarration: (narration: Narration | undefined) => void;
    changeLocationView: (newLocationView: MapLocation) => void;
    setPendingNarrationSequence: (pendingNarrationSequence: PendingNarrationSequence | undefined) => void;
  }) {
    super({ getWorldState, changeCharacterPosition, addKnownLocation, addTimeEvent, popNextTimeEvent, setCurrentTime, dealDamage });
    this.getGameState = getGameState;
    this.setNarration = setNarration;
    this.changeLocationView = changeLocationView;
    this.setPendingNarrationSequence = setPendingNarrationSequence;
  }
}
