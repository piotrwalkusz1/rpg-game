import type { DetectorContext } from './detector-context';

export interface DetectableEvent {
  get detectorContexts(): DetectorContext[];
}
