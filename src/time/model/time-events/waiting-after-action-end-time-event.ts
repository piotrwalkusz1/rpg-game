import { AIService } from '../../../ai/service/ai-service';
import type { Character } from '../../../character/model/character';
import type { WorldContext } from '../../../game/model/world-context';
import { TimeEvent } from '../time-event';
import type { TimeEventHandleResult } from '../time-event-handle-result';

export class WaitingAfterActionEndTimeEvent extends TimeEvent {
  readonly character: Character;

  constructor({ time, character }: { time: Date; character: Character }) {
    super({ time });
    this.character = character;
  }

  override handle(context: WorldContext): TimeEventHandleResult {
    this.character.currentAction = undefined;
    if (this.character === context.getPlayerCharacter()) {
      return { type: 'PLAYER_TURN' };
    } else {
      AIService.executeTurn(this.character, context);
      return { type: 'HANDLE_NEXT_EVENT' };
    }
  }
}
