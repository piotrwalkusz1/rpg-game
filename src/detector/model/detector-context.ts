import type { Detector } from './detector';

export interface DetectorContext {
  get detectors(): readonly Detector[];

  addDetector(detector: Detector): void;

  removeDetector(detector: Detector): void;

  getParentDetectorContext?(): DetectorContext | undefined;
}
