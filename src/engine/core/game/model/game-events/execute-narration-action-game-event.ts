import type { SingleNarrationSequenceStory } from '../../../story/model/stories/single-narration-sequence-story';
import { GameLoopService } from '../../service/game-loop-service';
import type { GameContext } from '../game-context';
import { GameEvent } from '../game-event';

export class ExecuteNarrationSequenceGameEvent extends GameEvent {
  readonly narrationActionProvider: SingleNarrationSequenceStory;

  constructor({ time, narrationActionProvider }: { time: Date; narrationActionProvider: SingleNarrationSequenceStory }) {
    super({ time });
    this.narrationActionProvider = narrationActionProvider;
  }

  override async process(context: GameContext): Promise<void> {
    const narrationSequence = this.narrationActionProvider.getNarrationSequenceIfPossibleToExecute(context.gameState);
    if (!narrationSequence) {
      return;
    }
    await GameLoopService.executeNarrationSequenceStages(narrationSequence, narrationSequence.checkpointStages, context);
  }
}
