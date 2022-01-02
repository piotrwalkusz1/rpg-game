import type { Detector } from './detector';

export interface DetectorContext {
  get detectors(): Detector[];

  getParentDetectorContext?(): DetectorContext | undefined;
}
