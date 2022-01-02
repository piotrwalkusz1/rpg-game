import type { DetectableEvent } from './detectable-event';

export abstract class Detector {
  readonly observators: (() => {})[] = [];

  abstract check(detectableEvent: DetectableEvent): boolean;
}
