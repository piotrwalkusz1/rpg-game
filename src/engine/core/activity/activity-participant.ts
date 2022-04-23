import type { Activity } from 'engine/core/activity';
import { Component } from 'engine/core/ecs';
import { ArrayUtils } from 'utils';
import { ManyToManyCollection } from 'utils/cache-relationship-utils';

class ActivitiesCollection extends ManyToManyCollection<Activity, ActivityParticipant> {
  override getCollection = (activity: Activity) => activity.participants;
}

export class ActivityParticipant extends Component {
  readonly activities: ActivitiesCollection = new ActivitiesCollection(this);

  getActivity<T extends Activity>(activityType: abstract new (...args: any[]) => T): T | undefined {
    return ArrayUtils.findFirstInstanceOf(this.activities.getArray(), activityType);
  }
}
