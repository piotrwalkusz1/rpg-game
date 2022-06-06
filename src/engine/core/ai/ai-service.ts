import { ActionExecutor, ActionService } from 'engine/core/action';
import { ActivityParticipant } from 'engine/core/activity';
import { Engine, Entity, EntityProvider } from 'engine/core/ecs';
import { AttackAction } from 'engine/modules/attack';
import { BattleActivity } from 'engine/modules/battle';
import { OfferParty } from 'engine/modules/offer';
import { AIActionExecutor } from '.';
import { CommandUtils } from '../command';

export namespace AIService {
  export const executeTurn = (entityProvider: EntityProvider, engine: Engine): void => {
    const entity: Entity | undefined = EntityProvider.getEntity(entityProvider);
    if (!entity || !entity.hasComponent(AIActionExecutor) || CommandUtils.isCommandPending(entity)) {
      return;
    }
    const offerParty: OfferParty | undefined = entity.getComponent(OfferParty);
    if (offerParty) {
      offerParty.getOffersAwaitingForDecisionOfThisParty().forEach((offer) => offer.makeDecision(offerParty, 'ACCEPTED'));
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
        const action = new AttackAction({ target: enemy });
        ActionService.scheduleAction(action, actionExecutor, engine);
      } else {
        activityParticipant.activities.remove(battle);
      }
    }
  };
}
