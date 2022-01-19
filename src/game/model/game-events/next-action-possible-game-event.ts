import { AIService } from '../../../ai/service/ai-service';
import type { Character } from '../../../character/model/character';
import type { GameContext } from '../game-context';
import { GameEvent } from '../game-event';

export class NextActionPossibleGameEvent extends GameEvent {
  readonly character: Character;

  constructor({ time, character }: { time: Date; character: Character }) {
    super({ time });
    this.character = character;
  }

  override process(context: GameContext): void {
    this.character.pendingAction = undefined;
    if (this.character !== context.player) {
      AIService.executeTurn(this.character, context);
    }
  }
}
