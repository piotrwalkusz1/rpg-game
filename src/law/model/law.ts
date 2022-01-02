import type { ActionScheduledEvent } from '../../action/model/actions/action';
import { Detector } from '../../detector/model/detector';
import type { DetectorType } from '../../detector/model/detector-type';
import { NarrationDescription } from '../../narration/model/narration-description';

export class Law {
  private readonly lawViolationAttemptDetector: Detector;

  constructor(detectorType: DetectorType<ActionScheduledEvent>) {
    this.lawViolationAttemptDetector = new Detector(detectorType, (actionScheduledEvent) => this.preventLawViolation(actionScheduledEvent));
  }

  get detectors(): Detector[] {
    return [this.lawViolationAttemptDetector];
  }

  private preventLawViolation(actionScheduledEvent: ActionScheduledEvent) {
    actionScheduledEvent.preventionNarrationDescription = new NarrationDescription({
      translationKey: 'LAW.LAW_VIOLATION_PREVENTION.THIS_IS_ILLEGAL'
    });
  }
}
