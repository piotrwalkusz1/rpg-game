import { ActionExecutedEvent } from 'engine/core/action';
import { ActivityParticipant } from 'engine/core/activity';
import { ECSEvent, System } from 'engine/core/ecs';
import { AttackAction } from 'engine/modules/attack';
import { setCommonActivity } from '../../core/activity/activity-utils';
import { BattleActivity } from './battle-activity';

export class BattleSystem extends System {
  override async processEvent(event: ECSEvent): Promise<void> {
    if (event instanceof ActionExecutedEvent && event.action instanceof AttackAction) {
      const action: AttackAction = event.action;
      const attacker: ActivityParticipant | undefined = event.executor.getComponent(ActivityParticipant);
      const target: ActivityParticipant | undefined = action.target.getComponent(ActivityParticipant);
      if (attacker && target) {
        setCommonActivity([attacker, target], BattleActivity, (participants) => new BattleActivity({ participants }));
      }
    }
  }
}
