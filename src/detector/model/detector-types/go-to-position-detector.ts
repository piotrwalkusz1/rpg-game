import { GoActionResultEvent } from '../../../action/model/actions/go-action';
import { createPositionPredicate, CreatePositionPredicateArgs, PositionPredicate } from '../../../map/model/position-predicate';
import type { DetectableEvent } from '../detectable-event';
import { DetectorType } from '../detector-type';

export class GoToPositionDetector extends DetectorType<GoActionResultEvent> {
  readonly positionPredicate: PositionPredicate;

  constructor(args: CreatePositionPredicateArgs) {
    super();
    this.positionPredicate = createPositionPredicate(args);
  }

  override check(detectableEvent: DetectableEvent): GoActionResultEvent | undefined {
    if (detectableEvent instanceof GoActionResultEvent && this.positionPredicate(detectableEvent.newPosition)) {
      return detectableEvent;
    }
  }
}
