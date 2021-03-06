import { ActionExecutingEvent, ActionExecutor } from 'engine/core/action';
import type { ECSEvent, Engine } from 'engine/core/ecs';
import { GameSystem } from 'engine/core/game';
import { Health } from 'engine/modules/health';
import { AttackAction } from './attack-action';
import { Attacker } from './attacker';

export class AttackSystem extends GameSystem {
  override async processEvent(event: ECSEvent, _engine: Engine): Promise<void> {
    if (event instanceof ActionExecutingEvent && event.action instanceof AttackAction) {
      this.executeAttackAction(event.action, event.executor);
    }
  }

  private executeAttackAction(action: AttackAction, executor: ActionExecutor): void {
    const damage: number | undefined = executor.getComponent(Attacker)?.damage;
    if (damage !== undefined) {
      action.target.getComponent(Health)?.decreaseHealthPoints(damage);
    }
  }
}
