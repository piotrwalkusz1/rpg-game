import { ActionExecutedEvent } from 'engine/core/action';
import { ActivityParticipant } from 'engine/core/activity';
import { ECSEvent, System } from 'engine/core/ecs';
import { AttackAction } from 'engine/modules/attack';
import { BattleService } from 'engine/modules/battle';

export class BattleSystem extends System {
  override async processEvent(event: ECSEvent): Promise<void> {
    if (event instanceof ActionExecutedEvent && event.action instanceof AttackAction) {
      const action: AttackAction = event.action;
      const attacker: ActivityParticipant | undefined = action.executor?.entity?.getComponent(ActivityParticipant);
      const target: ActivityParticipant | undefined = action.target.getComponent(ActivityParticipant);
      if (attacker && target) {
        BattleService.setCommonBattleActivity([attacker, target]);
      }
    }
  }
}
