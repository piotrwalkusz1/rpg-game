import { ActivityParticipant } from 'engine/core/activity';
import { BattleActivity, setCommonActivity } from 'engine/modules/battle';
import { TalkActivity } from 'engine/modules/talk';

describe('setCommonActivity', () => {
  it('should create new activity with participants', () => {
    const participant = new ActivityParticipant();
    const participant2 = new ActivityParticipant();

    const activity = setCommonActivity([participant, participant2], BattleActivity, (participants) => new BattleActivity({ participants }));

    expect(activity).toBeInstanceOf(BattleActivity);
    expect(activity.participants.getArray()).toEqual([participant, participant2]);
  });

  it('should add other participants from existing activities to new activity', () => {
    const participant = new ActivityParticipant();
    const participant2 = new ActivityParticipant();
    const participant3 = new ActivityParticipant();
    const existingActivity = new TalkActivity({ participants: [participant2, participant3] });

    const activity = setCommonActivity([participant, participant2], TalkActivity, (participants) => new TalkActivity({ participants }));

    expect(activity).toBeInstanceOf(TalkActivity);
    expect(activity.participants.getArray()).toEqual([participant2, participant3, participant]);
    expect(participant2.activities.getArray()).not.toContain(existingActivity);
    expect(participant3.activities.getArray()).not.toContain(existingActivity);
  });
});
