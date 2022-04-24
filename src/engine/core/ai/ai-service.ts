import { ActionExecutor, ActionService } from 'engine/core/action';
import { ActivityParticipant } from 'engine/core/activity';
import type { Engine, Entity } from 'engine/core/ecs';
import { AttackAction } from 'engine/modules/attack';
import { BattleActivity } from 'engine/modules/battle';
import { AIActionExecutor } from '.';

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
