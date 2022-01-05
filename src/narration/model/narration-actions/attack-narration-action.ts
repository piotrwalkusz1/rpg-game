import type { Action } from '../../../action/model/actions/action';
import { AttackAction } from '../../../action/model/actions/attack-action';
import type { Character } from '../../../character/model/character';
import type { GameState } from '../../../game/model/game-state';
import type { TranslatableText } from '../../../i18n/translatable-text';
import { NarrationActionOrder } from '../narration-action-order';
import { ActionBasedNarrationAction } from './action-based-narration-action';
import type { NarrationActionId } from './template-narration-action';

export class AttackNarrationAction extends ActionBasedNarrationAction {
  constructor(readonly victim: Character) {
    super();
  }

  override get id(): NarrationActionId {
    return 'ATTACK_CHARACTER';
  }

  override get order(): NarrationActionOrder {
    return NarrationActionOrder.ATTACK_CHARACTER;
  }

  override getAction(gameState: GameState): Action {
    return new AttackAction({ attacker: gameState.player.character, victim: this.victim });
  }

  protected override getNameContext(): TranslatableText | undefined {
    return this.victim.displayName;
  }
}
