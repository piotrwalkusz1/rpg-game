import { ActivityEndedEvent, ActivityParticipant } from 'engine/core/activity';
import { EntityEventListener, EntityEventListenerExecutor, EntityEventListenerExecutorParams } from 'engine/core/ecs';
import { InformationOwner } from 'engine/modules/information';
import { TalkActivity } from 'engine/modules/talk';
import { ArrayUtils, Type } from 'utils';
import { AddInformationAfterTalkEventListener } from './add-information-after-talk-event-listener';

export class AddInformationAfterTalkEventListenerExecutor extends EntityEventListenerExecutor<AddInformationAfterTalkEventListener> {
  override get eventListenerType(): Type<EntityEventListener> {
    return AddInformationAfterTalkEventListener;
  }

  override async processEvent({
    event,
    eventListener,
    entity
  }: EntityEventListenerExecutorParams<AddInformationAfterTalkEventListener>): Promise<void> {
    const activityParticipant = entity.getComponent(ActivityParticipant);
    if (
      activityParticipant &&
      event instanceof ActivityEndedEvent &&
      event.activity instanceof TalkActivity &&
      event.activity.participants.includes(activityParticipant)
    ) {
      const otherParticipants = event.activity.getParticipantsOtherThan(activityParticipant);
      ArrayUtils.mapAndFilterNotNull(otherParticipants, (participant) => participant.getComponent(InformationOwner)).forEach(
        (InformationOwner) => InformationOwner.addInformation(eventListener.information)
      );
    }
  }
}
