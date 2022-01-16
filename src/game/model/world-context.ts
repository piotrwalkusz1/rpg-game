import { add } from 'date-fns';
import type { Character } from '../../character/model/character';
import type { Position } from '../../map/model/position';
import type { TimeEvent } from '../../time/model/time-event';
import type { TraitOwner } from '../../trait/model/trait-owner';
import type { WorldState } from './world-state';

export class WorldContext {
  readonly getWorldState: () => WorldState;
  readonly changeCharacterPosition: (character: Character, position: Position) => void;
  readonly addKnownLocation: (character: Character, location: TraitOwner) => void;
  readonly addTimeEvent: (timeEvent: TimeEvent) => void;
  readonly popNextTimeEvent: () => TimeEvent | undefined;
  readonly setCurrentTime: (time: Date) => void;
  readonly dealDamage: (target: Character, damage: number) => void;

  constructor({
    getWorldState,
    changeCharacterPosition,
    addKnownLocation,
    addTimeEvent,
    popNextTimeEvent,
    setCurrentTime,
    dealDamage
  }: {
    getWorldState: () => WorldState;
    changeCharacterPosition: (character: Character, position: Position) => void;
    addKnownLocation: (character: Character, location: TraitOwner) => void;
    addTimeEvent: (timeEvent: TimeEvent) => void;
    popNextTimeEvent: () => TimeEvent | undefined;
    setCurrentTime: (time: Date) => void;
    dealDamage: (target: Character, damage: number) => void;
  }) {
    this.getWorldState = getWorldState;
    this.changeCharacterPosition = changeCharacterPosition;
    this.addKnownLocation = addKnownLocation;
    this.addTimeEvent = addTimeEvent;
    this.popNextTimeEvent = popNextTimeEvent;
    this.setCurrentTime = setCurrentTime;
    this.dealDamage = dealDamage;
  }

  getPlayerCharacter(): Character {
    return this.getWorldState().player.character;
  }

  getPlayerPosition(): Position | undefined {
    return this.getWorldState().getPlayerPosition();
  }

  getCurrentTime(): Date {
    return this.getWorldState().currentTime;
  }

  getCurrentTimePlusDuration(duration: Duration): Date {
    return add(this.getCurrentTime(), duration);
  }
}
