import type { GameContext } from '../../game/model/game-context';
import type { DetectableEvent } from './detectable-event';
import type { DetectorType } from './detector-type';

export class Detector<T = unknown> {
  constructor(
    private readonly detectorType: DetectorType<T>,
    private readonly observator: (detectionInfo: T, context: GameContext) => void
  ) {}

  run(detectableEvent: DetectableEvent, context: GameContext): void {
    const detectionInfo = this.detectorType.check(detectableEvent);
    if (detectionInfo !== undefined) {
      this.observator(detectionInfo, context);
    }
  }
}
