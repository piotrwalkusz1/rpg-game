import type { Character } from '../../../character/model/character';
import { BattleAction } from '../battle-action';
import type { BattleActionExecutionContext } from '../battle-action-execution-context';

export class AttackBattleAction extends BattleAction {
  readonly attacker: Character;
  readonly target: Character;

  constructor({ attacker, target }: { attacker: Character; target: Character }) {
    super();
    this.attacker = attacker;
    this.target = target;
  }

  execute(context: BattleActionExecutionContext): void {
    context.dealDamage(this.target, this.attacker.damage);
  }
}
