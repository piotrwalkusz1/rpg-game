import { add } from 'date-fns';
import type { Character } from '../../character/model/character';
import type { MapLocation } from '../../map/model/map-location';
import type { Position } from '../../map/model/position';
import type { Narration } from '../../narration/model/narration';
import type { PendingNarrationSequence } from '../../narration/model/narration-sequence/pending-narration-sequence';
import type { TraitOwner } from '../../trait/model/trait-owner';
import type { GameEvent } from './game-event';
import type { GameState } from './game-state';

export class GameContext {
  static KEY = Symbol();

  readonly changeCharacterPosition: (character: Character, position: Position) => void;
  readonly addKnownLocation: (character: Character, location: TraitOwner) => void;
  readonly addGameEvent: (event: GameEvent) => void;
  readonly popNextGameEvent: () => GameEvent | undefined;
  readonly setCurrentTime: (time: Date) => void;
  readonly dealDamage: (target: Character, damage: number) => void;
  readonly getGameState: () => GameState;
  readonly setNarration: (narration: Narration | undefined) => void;
  readonly changeLocationView: (newLocationView: MapLocation) => void;
  readonly setPendingNarrationSequence: (pendingNarrationSequence: PendingNarrationSequence | undefined) => void;

  constructor({
    changeCharacterPosition,
    addKnownLocation,
    addGameEvent,
    popNextGameEvent,
    setCurrentTime,
    dealDamage,
    getGameState,
    setNarration,
    changeLocationView,
    setPendingNarrationSequence
  }: {
    changeCharacterPosition: (character: Character, position: Position) => void;
    addKnownLocation: (character: Character, location: TraitOwner) => void;
    addGameEvent: (event: GameEvent) => void;
    popNextGameEvent: () => GameEvent | undefined;
    setCurrentTime: (time: Date) => void;
    dealDamage: (target: Character, damage: number) => void;
    getGameState: () => GameState;
    setNarration: (narration: Narration | undefined) => void;
    changeLocationView: (newLocationView: MapLocation) => void;
    setPendingNarrationSequence: (pendingNarrationSequence: PendingNarrationSequence | undefined) => void;
  }) {
    this.changeCharacterPosition = changeCharacterPosition;
    this.addKnownLocation = addKnownLocation;
    this.addGameEvent = addGameEvent;
    this.popNextGameEvent = popNextGameEvent;
    this.setCurrentTime = setCurrentTime;
    this.dealDamage = dealDamage;
    this.getGameState = getGameState;
    this.setNarration = setNarration;
    this.changeLocationView = changeLocationView;
    this.setPendingNarrationSequence = setPendingNarrationSequence;
  }

  get gameState(): GameState {
    return this.getGameState();
  }

  get player(): Character {
    return this.gameState.player;
  }

  get currentTime(): Date {
    return this.gameState.currentTime;
  }

  set currentTime(currentTime: Date) {
    this.setCurrentTime(currentTime);
  }

  get pendingNarrationSequence(): PendingNarrationSequence | undefined {
    return this.gameState.pendingNarrationSequence;
  }

  set pendingNarrationSequence(pendingNarrationSequence: PendingNarrationSequence | undefined) {
    this.setPendingNarrationSequence(pendingNarrationSequence);
  }

  set narration(narration: Narration | undefined) {
    this.setNarration(narration);
  }

  getCurrentTimePlusDuration(duration: Duration): Date {
    return add(this.currentTime, duration);
  }
}
