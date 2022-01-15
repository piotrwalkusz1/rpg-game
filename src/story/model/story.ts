import { ArrayUtils } from '../../common/array-utils';
import type { Detector } from '../../detector/model/detector';
import type { DetectorContext } from '../../detector/model/detector-context';
import type { GameState } from '../../game/model/game-state';
import type { Law } from '../../law/model/law';
import type { LawContext } from '../../law/model/law-context';
import type { NarrationProvider } from '../../narration/model/narration-provider/narration-provider';
import type { NarrationProviderOwner } from '../../narration/model/narration-provider/narration-provider-owner';

export abstract class Story {
  private readonly cleanUpOperations: (() => void)[] = [];

  abstract initialize(gameState: GameState): void;

  destroy(): void {
    this.cleanUpOperations.forEach((operation) => operation());
  }

  protected addNarrationProvider(narrationProviderOwner: NarrationProviderOwner, narrationProvider: NarrationProvider): void {
    narrationProviderOwner.narrationProviders.push(narrationProvider);
    this.cleanUpOperations.push(() => ArrayUtils.remove(narrationProviderOwner.narrationProviders, narrationProvider));
  }

  protected addDetector(detectorContext: DetectorContext, detector: Detector): void {
    detectorContext.detectors.push(detector);
    this.cleanUpOperations.push(() => ArrayUtils.remove(detectorContext.detectors, detector));
  }

  protected addLaw(lawContext: LawContext, law: Law): void {
    lawContext.laws.push(law);
    this.cleanUpOperations.push(() => ArrayUtils.remove(lawContext.laws, law));
  }

  protected addSubStory(subStory: Story, gameState: GameState): void {
    subStory.initialize(gameState);
    this.cleanUpOperations.push(() => subStory.destroy());
  }
}
