import type { ActionScheduledEvent } from '../../action/model/actions/action';
import type { Character } from '../../character/model/character';
import { Detector } from '../../detector/model/detector';
import type { DetectorType } from '../../detector/model/detector-type';
import type { TranslatableText } from '../../i18n/translatable-text';
import { NarrationDescription } from '../../narration/model/narration-description';
import { VisionService } from '../../trait/vision/service/vision-service';

export class Law {
  private readonly lawViolationAttemptDetector: Detector;
  private readonly guards: Character[];
  private readonly lawViolationPreventionDialogue?: TranslatableText;

  constructor({
    detector,
    guards,
    lawViolationPreventionDialogue
  }: {
    detector: DetectorType<ActionScheduledEvent>;
    guards?: Character[];
    lawViolationPreventionDialogue?: TranslatableText;
  }) {
    this.lawViolationAttemptDetector = new Detector(detector, (actionScheduledEvent) => this.preventLawViolation(actionScheduledEvent));
    this.guards = guards || [];
    this.lawViolationPreventionDialogue = lawViolationPreventionDialogue;
  }

  get detectors(): Detector[] {
    return [this.lawViolationAttemptDetector];
  }

  private preventLawViolation(actionScheduledEvent: ActionScheduledEvent) {
    const guard = this.guards.find((guard) => VisionService.isVisible(actionScheduledEvent, guard));
    if (guard && this.lawViolationPreventionDialogue) {
      actionScheduledEvent.preventionNarrationDescription = new NarrationDescription(this.lawViolationPreventionDialogue, guard);
    } else {
      actionScheduledEvent.preventionNarrationDescription = new NarrationDescription({
        translationKey: 'LAW.LAW_VIOLATION_PREVENTION.THIS_IS_ILLEGAL'
      });
    }
  }
}
