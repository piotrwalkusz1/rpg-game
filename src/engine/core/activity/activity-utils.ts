import type { Activity, ActivityParticipant } from 'engine/core/activity';
import { ArrayUtils, Type } from 'utils';

export const setCommonActivity = <T extends Activity>(
  participants: ActivityParticipant[],
  activityType: Type<T>,
  newActivity: (participants: ActivityParticipant[]) => T
): T => {
  const activities = participants.flatMap((character) => ArrayUtils.filterInstanceOf(character.activities.getArray(), activityType));
  const currentParticipants = activities.flatMap((activity) => activity.participants.getArray());
  activities.forEach((activity) => activity.participants.removeAll());
  return newActivity(ArrayUtils.distinct([...currentParticipants, ...participants]));
};
