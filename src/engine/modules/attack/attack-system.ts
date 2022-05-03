import { ActionExecutedEvent, ActionExecutingEvent, ActionExecutor } from 'engine/core/action';
import { AIService } from 'engine/core/ai';
import { System, type ECSEvent, type Engine } from 'engine/core/ecs';
import { AttackAction, Attacker } from 'engine/modules/attack';
import { Health } from 'engine/modules/health';

export class AttackSystem extends System {
  override async processEvent(event: ECSEvent, engine: Engine): Promise<void> {
    if (event instanceof ActionExecutingEvent && event.action instanceof AttackAction) {
      this.executeAttackAction(event.action, event.executor);
    } else if (event instanceof ActionExecutedEvent && event.action instanceof AttackAction) {
      AIService.executeTurn(event.action.target, engine);
    }
  }

  private executeAttackAction(action: AttackAction, executor: ActionExecutor): void {
    const damage: number | undefined = executor.entity?.getComponent(Attacker)?.damage;
    if (damage !== undefined) {
      action.target.getComponent(Health)?.decreaseHealthPoints(damage);
    }
  }
}
