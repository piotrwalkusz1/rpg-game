import type { Activity } from 'engine/core/activity';
import { Component } from 'engine/core/ecs';
import { ArrayUtils, Type } from 'utils';

export class ActivityParticipant extends Component {
  private _activities: Activity[] = [];

  get activities(): readonly Activity[] {
    return this._activities;
  }

  getActivity<T extends Activity>(activityType: Type<T>): T | undefined {
    return ArrayUtils.findFirstInstanceOf(this._activities, activityType);
  }

  addActivity(activity: Activity): void {
    this._activities.push(activity);
  }

  removeActivity(activity: Activity): void {
    ArrayUtils.removeFirst(this._activities, activity);
  }
}
