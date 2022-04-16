import type { DetectableEvent } from './detectable-event';

export abstract class DetectorType<T = unknown> {
  abstract check(detectableEvent: DetectableEvent): T | undefined;
}
