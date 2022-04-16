import { AttackAction } from '../../../../modules/battle/model/actions/attack-action';
import type { Actor } from '../../../actor/model/actor';
import { NarrationActionOrder } from '../narration-action-order';
import { ActionBasedNarrationAction } from './action-based-narration-action';

export class AttackNarrationAction extends ActionBasedNarrationAction {
  constructor(victim: Actor) {
    super({
      id: 'ATTACK_CHARACTER',
      nameContext: victim,
      order: NarrationActionOrder.ATTACK_CHARACTER,
      action: (gameState) => new AttackAction({ character: gameState.player, target: victim })
    });
  }
}
