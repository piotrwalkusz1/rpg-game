import type { Character } from '../../../character/model/character';
import type { Position } from '../../../map/model/position';
import { PositionSet } from '../../../map/model/position-set';
import type { TraitOwner } from '../../../trait/model/trait-owner';
import type { ActionExecutionContext } from '../action-execution-context';
import { Action, ActionResultEvent, ActionScheduledEvent } from './action';

export class GiveLocationActionScheduledEvent extends ActionScheduledEvent {
  readonly position: Position;

  constructor({ position }: { position: Position }) {
    super({ visibilityPositions: PositionSet.create() });
    this.position = position;
  }

  override get detectablePositions(): Position[] {
    return [this.position];
  }
}

export class GiveLocationActionResultEvent extends ActionResultEvent {
  readonly position: Position;

  constructor({ position }: { position: Position }) {
    super({ visibilityPositions: PositionSet.create() });
    this.position = position;
  }

  override get detectablePositions(): Position[] {
    return [this.position];
  }
}

export class GiveLocationAction extends Action {
  readonly locationGiver: Character;
  readonly locationReceiver: Character;
  readonly location: TraitOwner;
  readonly position: Position;

  constructor({
    locationGiver,
    locationReceiver,
    location
  }: {
    locationGiver: Character;
    locationReceiver: Character;
    location: TraitOwner;
  }) {
    super();
    if (!locationGiver.position) {
      throw new Error('Location giver must have position');
    }
    this.locationGiver = locationGiver;
    this.locationReceiver = locationReceiver;
    this.location = location;
    this.position = locationGiver.position;
  }

  execute(actionExecutionContext: ActionExecutionContext): GiveLocationActionResultEvent {
    actionExecutionContext.addKnownLocation(this.locationReceiver, this.location);
    return new GiveLocationActionResultEvent({ position: this.position });
  }

  getActionScheduledEvent(): ActionScheduledEvent | undefined {
    return new GiveLocationActionScheduledEvent({ position: this.position });
  }
}
