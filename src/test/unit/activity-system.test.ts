import { CDIContainer } from 'cdi-container';
import { Activity, ActivityParticipant } from 'engine/core/activity';
import { EndActivityEvent } from 'engine/core/activity/activity-event';
import { ActivitySystem } from 'engine/core/activity/activity-system';
import type { GameEngine } from 'engine/core/game';
import type { Time } from 'engine/core/time';
import { GameBuilder } from 'game';

describe('Activity system', () => {
  class MockActivity extends Activity {}

  let activitySystem: ActivitySystem;
  let engine: GameEngine;
  let time: Time;

  beforeEach(() => {
    activitySystem = new ActivitySystem();
    engine = CDIContainer.create().get(GameBuilder).build();
    time = engine.time;
  });

  describe('EndActivityEvent', () => {
    it('should remove all participants from activity', async () => {
      const activityParticipant = engine.addEntityWithComponent(new ActivityParticipant());
      const activityParticipant2 = engine.addEntityWithComponent(new ActivityParticipant());
      const activity = new MockActivity({ participants: [activityParticipant, activityParticipant2] });

      await activitySystem.processEvent(new EndActivityEvent({ time, activity }), engine);

      expect(activity.participants.getArray()).toEqual([]);
      expect(activityParticipant.activities.getArray()).toEqual([]);
      expect(activityParticipant2.activities.getArray()).toEqual([]);
    });
  });
});
