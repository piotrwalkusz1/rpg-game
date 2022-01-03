import type { DetectableEvent } from '../model/detectable-event';
import type { Detector } from '../model/detector';
import type { DetectorContext } from '../model/detector-context';

export namespace DetectorService {
  export const runDetectors = (detectableEvent: DetectableEvent): void => {
    const detectors = getDetectorsFromDetectableEvent(detectableEvent);
    detectors.forEach((detector) => detector.run(detectableEvent));
  };

  export const getDetectorsFromDetectableEvent = (detectableEvent: DetectableEvent): Detector[] => {
    return detectableEvent.detectorContexts.flatMap((detectorContext) => getDetectorsFromDetectorContext(detectorContext));
  };

  export const getDetectorsFromDetectorContext = (detectorContext: DetectorContext): Detector[] => {
    const parentDetectorContext = detectorContext.getParentDetectorContext && detectorContext.getParentDetectorContext();
    return [...detectorContext.detectors, ...(parentDetectorContext ? getDetectorsFromDetectorContext(parentDetectorContext) : [])];
  };
}