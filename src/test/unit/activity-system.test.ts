import { Activity } from 'engine/core/activity';
import { EndActivityEvent } from 'engine/core/activity/activity-event';
import { ActivitySystem } from 'engine/core/activity/activity-system';
import type { Time } from 'engine/core/time';
import { MockEngine } from 'test/mock/mock-engine';

describe('Activity system', () => {
  class MockActivity extends Activity {}

  let activitySystem: ActivitySystem;
  let engine: MockEngine;
  let time: Time;

  beforeEach(() => {
    activitySystem = new ActivitySystem();
    engine = new MockEngine();
    time = engine.time;
  });

  describe('EndActivityEvent', () => {
    it('should remove all participants from activity', async () => {
      const firstActivityParticiant = engine.addActivityParticipant();
      const secondActivityParticiant = engine.addActivityParticipant();
      const activity = new MockActivity({ participants: [firstActivityParticiant, secondActivityParticiant] });

      await activitySystem.processEvent(new EndActivityEvent({ time, activity }), engine);

      expect(activity.participants.getArray()).toEqual([]);
      expect(firstActivityParticiant.activities.getArray()).toEqual([]);
      expect(secondActivityParticiant.activities.getArray()).toEqual([]);
    });
  });
});
