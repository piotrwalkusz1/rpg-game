import type { TranslatableText } from '../../../../i18n/translatable-text';
import type { CharacterActionScheduledEvent } from '../../../core/action/model/character-action';
import type { Character } from '../../../core/character/model/character';
import { Detector } from '../../../core/detector/model/detector';
import type { DetectorType } from '../../../core/detector/model/detector-type';
import { NarrationDescription } from '../../../core/narration/model/narration-description';
import { VisionService } from '../../vision/service/vision-service';

export class Law {
  private readonly lawViolationAttemptDetector: Detector<CharacterActionScheduledEvent>;
  private readonly guards: Character[];
  private readonly lawViolationPreventionDialogue?: TranslatableText;

  constructor({
    detector,
    guards,
    lawViolationPreventionDialogue
  }: {
    detector: DetectorType<CharacterActionScheduledEvent>;
    guards?: Character[];
    lawViolationPreventionDialogue?: TranslatableText;
  }) {
    this.lawViolationAttemptDetector = new Detector(detector, (actionScheduledEvent) => this.preventLawViolation(actionScheduledEvent));
    this.guards = guards || [];
    this.lawViolationPreventionDialogue = lawViolationPreventionDialogue;
  }

  get detectors(): Detector<unknown>[] {
    return [this.lawViolationAttemptDetector] as Detector<unknown>[];
  }

  private preventLawViolation(actionScheduledEvent: CharacterActionScheduledEvent) {
    const guard = this.guards.find((guard) => VisionService.isVisible(actionScheduledEvent, guard));
    if (guard && this.lawViolationPreventionDialogue) {
      actionScheduledEvent.prevent(new NarrationDescription(this.lawViolationPreventionDialogue, guard));
    } else {
      actionScheduledEvent.prevent(new NarrationDescription('LAW.LAW_VIOLATION_PREVENTION.THIS_IS_ILLEGAL'));
    }
  }
}
