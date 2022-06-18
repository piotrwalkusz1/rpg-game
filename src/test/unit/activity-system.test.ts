import { CDIContainer } from 'cdi-container';
import type { Activity, ActivityService } from 'engine/core/activity';
import { ActivityEndScheduledEvent } from 'engine/core/activity/activity-event';
import { ActivitySystem } from 'engine/core/activity/activity-system';
import type { GameEngine } from 'engine/core/game';
import type { Time } from 'engine/core/time';
import { GameBuilder } from 'game';
import { IMock, Mock, Times } from 'typemoq';

describe('Activity system', () => {
  let activityServiceMock: IMock<ActivityService>;
  let activitySystem: ActivitySystem;
  let engine: GameEngine;
  let time: Time;

  beforeEach(() => {
    activityServiceMock = Mock.ofType<ActivityService>();
    activitySystem = new ActivitySystem(activityServiceMock.object);
    engine = CDIContainer.default().get(GameBuilder).build();
    time = engine.time;
  });

  describe('processEvent', () => {
    it('should end activity', async () => {
      const activity = Mock.ofType<Activity>().object;

      await activitySystem.processEvent(new ActivityEndScheduledEvent({ time, activity }), engine);

      activityServiceMock.verify((instance) => instance.endActivity(activity, engine), Times.once());
    });
  });
});
