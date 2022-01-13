import type { Battle } from '../../battle/model/battle';
import type { MapField } from '../../map/model/map-field';
import type { MapLocation } from '../../map/model/map-location';
import type { Narration } from '../../narration/model/narration';
import type { Story } from '../../story/model/story';
import type { Player } from './player';

export class GameState {
  readonly player: Player;
  readonly world: MapLocation;
  locationView: MapLocation;
  selectedField?: MapField;
  narration?: Narration;
  battle?: Battle;
  private readonly stories: Story[] = [];

  constructor({ player, world }: { player: Player; world: MapLocation }) {
    this.player = player;
    this.world = world;
    this.locationView = player.character.field?.location || world;
  }

  addStory(story: Story): void {
    this.stories.push(story);
    story.initialize(this);
  }
}
