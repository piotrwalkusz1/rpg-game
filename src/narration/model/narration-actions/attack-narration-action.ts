import { AttackAction } from '../../../action/model/actions/attack-action';
import type { Character } from '../../../character/model/character';
import { NarrationActionOrder } from '../narration-action-order';
import { ActionBasedNarrationAction } from './action-based-narration-action';

export class AttackNarrationAction extends ActionBasedNarrationAction {
  constructor(victim: Character) {
    super({
      id: 'ATTACK_CHARACTER',
      nameContext: victim,
      order: NarrationActionOrder.ATTACK_CHARACTER,
      action: (gameState) => new AttackAction({ character: gameState.player, target: victim })
    });
  }
}
