import type { BattleNarration } from '../../../modules/battle/model/battle-narration';
import type { Character } from '../../character/model/character';
import type { MapField } from '../../map/model/map-field';
import type { MapLocation } from '../../map/model/map-location';
import type { Position } from '../../map/model/position';
import type { Narration } from '../../narration/model/narration';
import type { NarrationSequence } from '../../narration/model/narration-sequence/narration-sequence';
import type { PendingNarrationSequence } from '../../narration/model/narration-sequence/pending-narration-sequence';
import type { Story } from '../../story/model/story';
import { GameEventQueue } from './game-event-queue';

export class GameState {
  private readonly stories: Story[] = [];
  locationView: MapLocation;
  selectedField?: MapField;
  narration?: Narration;
  battle?: BattleNarration;
  readonly world: MapLocation;
  currentTime: Date = new Date(2000, 5, 1, 8, 0, 0, 0);
  readonly eventQueue: GameEventQueue = new GameEventQueue();
  readonly player: Character;
  pendingNarrationSequence?: PendingNarrationSequence;
  scheduledNarrationSequences: NarrationSequence[] = [];
  blockedScreen = false;

  constructor({ player, world }: { player: Character; world: MapLocation }) {
    this.player = player;
    this.world = world;
    this.locationView = player.field?.location || world;
  }

  addStory(story: Story): void {
    this.stories.push(story);
    story.initialize(this);
  }

  getPlayerPosition(): Position | undefined {
    return this.player.position;
  }
}
