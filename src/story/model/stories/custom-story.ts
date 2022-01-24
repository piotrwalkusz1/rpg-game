import type { Detector } from '../../../detector/model/detector';
import type { DetectorContext } from '../../../detector/model/detector-context';
import type { GameState } from '../../../game/model/game-state';
import type { Law } from '../../../law/model/law';
import type { LawContext } from '../../../law/model/law-context';
import type { NarrationProvider } from '../../../narration/model/narration-provider/narration-provider';
import type { NarrationProviderOwner } from '../../../narration/model/narration-provider/narration-provider-owner';
import { Story } from '../story';

export class CustomStory extends Story {
  private readonly narrationProviders: (
    gameState: GameState
  ) => { narrationProviderOwner: NarrationProviderOwner; narrationProvider: NarrationProvider }[];
  private readonly detectors: (gameState: GameState) => { detectorContext: DetectorContext; detector: Detector }[];
  private readonly laws: (gameState: GameState) => { lawContext: LawContext; law: Law }[];
  private readonly subStories: Story[];

  constructor({
    narrationProviders,
    detectors,
    laws,
    subStories
  }: {
    narrationProviders?: (
      gameState: GameState
    ) => { narrationProviderOwner: NarrationProviderOwner; narrationProvider: NarrationProvider }[];
    detectors?: (gameState: GameState) => { detectorContext: DetectorContext; detector: Detector<any> }[];
    laws?: (gameState: GameState) => { lawContext: LawContext; law: Law }[];
    subStories?: Story[];
  }) {
    super();
    this.narrationProviders = narrationProviders || (() => []);
    this.detectors = detectors || (() => []);
    this.laws = laws || (() => []);
    this.subStories = subStories || [];
  }

  override initialize(gameState: GameState): void {
    this.narrationProviders(gameState).forEach(({ narrationProviderOwner, narrationProvider }) =>
      this.addNarrationProvider(narrationProviderOwner, narrationProvider)
    );
    this.detectors(gameState).forEach(({ detectorContext, detector }) => this.addDetector(detectorContext, detector));
    this.laws(gameState).forEach(({ lawContext, law }) => this.addLaw(lawContext, law));
    this.subStories.forEach((subStory) => this.addSubStory(subStory, gameState));
  }
}
