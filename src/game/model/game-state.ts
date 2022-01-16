import type { Battle } from '../../battle/model/battle';
import type { MapField } from '../../map/model/map-field';
import type { MapLocation } from '../../map/model/map-location';
import type { Narration } from '../../narration/model/narration';
import type { Story } from '../../story/model/story';
import type { Player } from './player';
import { WorldState } from './world-state';

export class GameState {
  readonly worldState: WorldState;
  private readonly stories: Story[] = [];
  locationView: MapLocation;
  selectedField?: MapField;
  narration?: Narration;
  battle?: Battle;

  constructor({ player, world }: { player: Player; world: MapLocation }) {
    this.worldState = new WorldState({ player, world });
    this.locationView = player.character.field?.location || world;
  }

  get player(): Player {
    return this.worldState.player;
  }

  addStory(story: Story): void {
    this.stories.push(story);
    story.initialize(this);
  }
}
