import type { Duration } from 'date-fns';
import type { DetectableEvent } from '../../detector/model/detectable-event';
import type { GameContext } from '../../game/model/game-context';
import type { Position } from '../../map/model/position';
import type { PositionSet } from '../../map/model/position-set';
import type { Trait } from '../../trait/model/trait';
import type { TraitOwner } from '../../trait/model/trait-owner';
import { PositionBasedObservableTrait } from '../../vision/model/observable-traits/position-based-observable-trait';

export abstract class ActionScheduledEvent implements DetectableEvent, TraitOwner {
  readonly traits: Trait[];

  constructor({ visibilityPositions }: { visibilityPositions: PositionSet }) {
    this.traits = [new PositionBasedObservableTrait(visibilityPositions)];
  }

  abstract get detectablePositions(): Position[];
}

export abstract class ActionResultEvent implements DetectableEvent, TraitOwner {
  readonly traits: Trait[];

  constructor({ visibilityPositions }: { visibilityPositions: PositionSet }) {
    this.traits = [new PositionBasedObservableTrait(visibilityPositions)];
  }

  abstract get detectablePositions(): Position[];
}

export abstract class Action {
  abstract get duration(): Duration;

  abstract execute(context: GameContext): Promise<ActionResultEvent | undefined>;

  abstract getActionScheduledEvent(context: GameContext): ActionScheduledEvent | undefined;
}
