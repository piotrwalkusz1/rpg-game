import { ActionExecutor } from 'engine/core/action';
import { ActivityParticipant } from 'engine/core/activity';
import { AIActionExecutor } from 'engine/core/ai/service/ai-action-executor';
import type { Engine, Entity } from 'engine/core/ecs';
import { AttackAction } from '../../../modules/attack/attack-action';
import { BattleActivity } from '../../../modules/battle/battle-activity';
import { ActionService } from '../../action/service/action-service';

export namespace AIService {
  export const executeTurn = (entity: Entity, engine: Engine): void => {
    if (!entity.hasComponent(AIActionExecutor)) {
      return;
    }
    const actionExecutor: ActionExecutor | undefined = entity.getComponent(ActionExecutor);
    if (!actionExecutor || actionExecutor.pendingAction) {
      return;
    }
    const activityParticipant: ActivityParticipant | undefined = entity.getComponent(ActivityParticipant);
    if (!activityParticipant) {
      return;
    }

    const battle: BattleActivity | undefined = activityParticipant.getActivity(BattleActivity);
    if (battle) {
      const enemy: Entity | undefined = battle.participants
        .getArray()
        .map((pariticapt) => pariticapt.entity)
        .filter((participant) => participant !== entity)[0];
      if (enemy) {
        const action = new AttackAction({ attacker: actionExecutor, target: enemy });
        ActionService.scheduleAction(action, engine);
      } else {
        activityParticipant.activities.remove(battle);
      }
    }
  };
}
