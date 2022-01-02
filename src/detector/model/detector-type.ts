import type { DetectableEvent } from './detectable-event';

export abstract class DetectorType<T extends {} = any> {
  abstract check(detectableEvent: DetectableEvent): T | undefined;
}
