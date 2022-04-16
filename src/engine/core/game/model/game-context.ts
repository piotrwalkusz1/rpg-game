import { add } from 'date-fns';
import type { BattleNarration } from '../../../modules/battle/model/battle-narration';
import type { Activity } from '../../activity/model/activity';
import type { Actor } from '../../actor/model/actor';
import type { MapLocation } from '../../map/model/map-location';
import type { Position } from '../../map/model/position';
import type { TerrainObject } from '../../map/model/terrain-object';
import type { Narration } from '../../narration/model/narration';
import type { PendingNarrationSequence } from '../../narration/model/narration-sequence/pending-narration-sequence';
import type { GameEvent } from './game-event';
import type { GameState } from './game-state';

export class GameContext {
  static KEY = Symbol();

  readonly changeCharacterPosition: (character: Actor, position: Position) => void;
  readonly addKnownLocation: (character: Actor, terrainObject: TerrainObject) => void;
  readonly addGameEvent: (event: GameEvent) => void;
  readonly popNextGameEvent: () => GameEvent | undefined;
  readonly setCurrentTime: (time: Date) => void;
  readonly dealDamage: (target: Actor, damage: number) => void;
  readonly getGameState: () => GameState;
  readonly setNarration: (narration: Narration | undefined) => void;
  readonly setBattle: (battle: BattleNarration | undefined) => void;
  readonly changeLocationView: (newLocationView: MapLocation) => void;
  readonly setPendingNarrationSequence: (pendingNarrationSequence: PendingNarrationSequence | undefined) => void;
  readonly addActivity: (character: Actor, activity: Activity) => void;
  readonly removeActivity: (character: Actor, activity: Activity) => void;
  readonly setBlockedScreen: (blockedScreen: boolean) => void;
  readonly changeTime: (newTime: Date, duration: number) => Promise<void>;
  readonly refresh: () => void;

  constructor({
    changeCharacterPosition,
    addKnownLocation,
    addGameEvent,
    popNextGameEvent,
    setCurrentTime,
    dealDamage,
    getGameState,
    setNarration,
    setBattle,
    changeLocationView,
    setPendingNarrationSequence,
    addActivity,
    removeActivity,
    setBlockedScreen,
    changeTime,
    refresh
  }: {
    changeCharacterPosition: (character: Actor, position: Position) => void;
    addKnownLocation: (character: Actor, terrainObject: TerrainObject) => void;
    addGameEvent: (event: GameEvent) => void;
    popNextGameEvent: () => GameEvent | undefined;
    setCurrentTime: (time: Date) => void;
    dealDamage: (target: Actor, damage: number) => void;
    getGameState: () => GameState;
    setNarration: (narration: Narration | undefined) => void;
    setBattle: (battle: BattleNarration | undefined) => void;
    changeLocationView: (newLocationView: MapLocation) => void;
    setPendingNarrationSequence: (pendingNarrationSequence: PendingNarrationSequence | undefined) => void;
    addActivity: (character: Actor, activity: Activity) => void;
    removeActivity: (character: Actor, activity: Activity) => void;
    setBlockedScreen: (blockedScreen: boolean) => void;
    changeTime: (newTime: Date, duration: number) => Promise<void>;
    refresh: () => void;
  }) {
    this.changeCharacterPosition = changeCharacterPosition;
    this.addKnownLocation = addKnownLocation;
    this.addGameEvent = addGameEvent;
    this.popNextGameEvent = popNextGameEvent;
    this.setCurrentTime = setCurrentTime;
    this.dealDamage = dealDamage;
    this.getGameState = getGameState;
    this.setNarration = setNarration;
    this.setBattle = setBattle;
    this.changeLocationView = changeLocationView;
    this.setPendingNarrationSequence = setPendingNarrationSequence;
    this.addActivity = addActivity;
    this.removeActivity = removeActivity;
    this.setBlockedScreen = setBlockedScreen;
    this.changeTime = changeTime;
    this.refresh = refresh;
  }

  get gameState(): GameState {
    return this.getGameState();
  }

  get player(): Actor {
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

  set battle(battle: BattleNarration | undefined) {
    this.setBattle(battle);
  }

  set blockedScreen(blockedScreen: boolean) {
    this.setBlockedScreen(blockedScreen);
  }

  getCurrentTimePlusDuration(duration: Duration): Date {
    return add(this.currentTime, duration);
  }
}
