import type { DetectableEvent } from '../../../../core/detector/model/detectable-event';
import { DetectorType } from '../../../../core/detector/model/detector-type';
import {
  createPositionPredicate,
  type CreatePositionPredicateArgs,
  type PositionPredicate
} from '../../../../core/map/model/position-predicate';
import { GoActionScheduledEvent } from '../actions/go-action';

export class AttemptGoToPositionDetector extends DetectorType<GoActionScheduledEvent> {
  readonly positionPredicate: PositionPredicate;

  constructor(args: CreatePositionPredicateArgs) {
    super();
    this.positionPredicate = createPositionPredicate(args);
  }

  override check(detectableEvent: DetectableEvent): GoActionScheduledEvent | undefined {
    if (detectableEvent instanceof GoActionScheduledEvent && this.positionPredicate(detectableEvent.newPosition)) {
      return detectableEvent;
    }
  }
}
