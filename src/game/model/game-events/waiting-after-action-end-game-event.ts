import { AIService } from '../../../ai/service/ai-service';
import type { Character } from '../../../character/model/character';
import type { GameContext } from '../game-context';
import { GameEvent } from '../game-event';
import type { GameEventHandleResult } from '../game-event-handle-result';

export class WaitingAfterActionEndGameEvent extends GameEvent {
  readonly character: Character;

  constructor({ time, character }: { time: Date; character: Character }) {
    super({ time });
    this.character = character;
  }

  override process(context: GameContext): GameEventHandleResult {
    this.character.currentAction = undefined;
    if (this.character === context.getPlayerCharacter()) {
      return { type: 'PLAYER_TURN' };
    } else {
      AIService.executeTurn(this.character, context);
      return { type: 'PROCESS_NEXT_EVENT' };
    }
  }
}
