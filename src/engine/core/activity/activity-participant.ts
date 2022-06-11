import type { Activity } from 'engine/core/activity';
import { Component } from 'engine/core/ecs';
import { ArrayUtils, ManyToManyCollection, Type } from 'utils';

class ActivitiesCollection extends ManyToManyCollection<Activity, ActivityParticipant> {
  override getCollection = (activity: Activity) => activity.participants;
}

export class ActivityParticipant extends Component {
  readonly activities: ActivitiesCollection = new ActivitiesCollection(this);

  getActivity<T extends Activity>(activityType: Type<T>): T | undefined {
    return ArrayUtils.findFirstInstanceOf(this.activities.getArray(), activityType);
  }

  removeActivity(activity: Activity): void {
    return this.activities.remove(activity);
  }
}
