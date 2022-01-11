import { GoActionScheduledEvent } from '../../../action/model/actions/go-action';
import { createPositionPredicate, CreatePositionPredicateArgs, PositionPredicate } from '../../../map/model/position-predicate';
import type { DetectableEvent } from '../detectable-event';
import { DetectorType } from '../detector-type';

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
