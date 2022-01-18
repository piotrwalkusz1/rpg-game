import type { Battle } from '../../battle/model/battle';
import type { MapField } from '../../map/model/map-field';
import type { MapLocation } from '../../map/model/map-location';
import type { Position } from '../../map/model/position';
import type { Narration } from '../../narration/model/narration';
import type { Story } from '../../story/model/story';
import { TimeAxis } from '../../time/model/time-axis';
import type { Player } from './player';

export class GameState {
  private readonly stories: Story[] = [];
  locationView: MapLocation;
  selectedField?: MapField;
  narration?: Narration;
  battle?: Battle;
  readonly player: Player;
  readonly world: MapLocation;
  currentTime: Date = new Date(2000, 5, 1, 8, 0, 0, 0);
  readonly timeAxis: TimeAxis = new TimeAxis();

  constructor({ player, world }: { player: Player; world: MapLocation }) {
    this.player = player;
    this.world = world;
    this.locationView = player.character.field?.location || world;
  }

  addStory(story: Story): void {
    this.stories.push(story);
    story.initialize(this);
  }

  getPlayerPosition(): Position | undefined {
    return this.player.character.position;
  }
}
