import type { DetectableEvent } from './detectable-event';
import type { DetectorType } from './detector-type';

export class Detector<T = unknown> {
  constructor(private readonly detectorType: DetectorType<T>, private readonly observator: (detectionInfo: T) => void) {}

  run(detectableEvent: DetectableEvent): void {
    const detectionInfo = this.detectorType.check(detectableEvent);
    if (detectionInfo !== undefined) {
      this.observator(detectionInfo);
    }
  }
}
