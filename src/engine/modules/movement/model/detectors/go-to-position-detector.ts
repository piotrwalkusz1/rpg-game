import type { DetectableEvent } from '../../../../core/detector/model/detectable-event';
import { DetectorType } from '../../../../core/detector/model/detector-type';
import {
  createPositionPredicate,
  type CreatePositionPredicateArgs,
  type PositionPredicate
} from '../../../../core/map/model/position-predicate';
import { GoActionResultEvent } from '../actions/go-action';

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
