import { Activity, ActivityParticipant } from 'engine/core/activity';

describe('ActivityParticiant', () => {
  class MockActivity extends Activity {}

  let activityParticiant: ActivityParticipant;

  beforeEach(() => {
    activityParticiant = new ActivityParticipant();
  });

  describe('getActivity method', () => {
    it('should return undefined if activity does not exist', () => {
      expect(activityParticiant.getActivity(MockActivity)).toEqual(undefined);
    });

    it('should return activity if activity exists', () => {
      const activity = new MockActivity({ participants: [activityParticiant] });

      expect(activityParticiant.getActivity(MockActivity)).toEqual(activity);
    });
  });
});
