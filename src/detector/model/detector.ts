import type { DetectableEvent } from './detectable-event';

export abstract class Detector<T extends {} = any> {
  readonly observators: ((detectionInfo: T) => {})[] = [];

  run(detectableEvent: DetectableEvent): void {
    const detectionInfo = this.check(detectableEvent);
    if (detectionInfo !== undefined) {
      this.observators.forEach((observator) => observator(detectionInfo));
    }
  }

  protected abstract check(detectableEvent: DetectableEvent): T | undefined;
}
