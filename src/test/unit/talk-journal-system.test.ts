import { CDIContainer } from 'cdi-container';
import { ActivityEndedEvent } from 'engine/core/activity/activity-event';
import type { GameEngine } from 'engine/core/game';
import { Character } from 'engine/modules/character';
import { CharacterJournalEntry } from 'engine/modules/journal-extensions/journal-character';
import { TalkJournalSystem } from 'engine/modules/journal-extensions/journal-talk';
import { TalkActivity } from 'engine/modules/talk';
import { GameBuilder, getPlayer, Player } from 'game';

describe('TalkJournalSystem', () => {
  let talkJournalSystem: TalkJournalSystem;
  let engine: GameEngine;
  let player: Player;
  let character: Character;
  let character2: Character;

  beforeEach(() => {
    talkJournalSystem = new TalkJournalSystem();
    engine = CDIContainer.default().get(GameBuilder).build();
    player = getPlayer(engine);
    character = Character.create(engine);
    character2 = Character.create(engine);
  });

  describe('EndTalkActivityEvent', () => {
    it('should add entry to journal', async () => {
      const endTalkEvent = new ActivityEndedEvent({
        time: engine.time,
        activity: new TalkActivity({ participants: [character.activityParticipant, player.activityParticipant] })
      });

      await talkJournalSystem.processEvent(endTalkEvent, engine);

      expect(player.journal.entries).toEqual([new CharacterJournalEntry({ text: 'JOURNAL.ENTRY.TALK_END', character, time: engine.time })]);
    });

    it('should do nothing if talk has more than 2 participants', async () => {
      const endTalkEvent = new ActivityEndedEvent({
        time: engine.time,
        activity: new TalkActivity({
          participants: [character.activityParticipant, player.activityParticipant, character2.activityParticipant]
        })
      });

      await talkJournalSystem.processEvent(endTalkEvent, engine);

      expect(player.journal.entries).toEqual([]);
    });

    it('should do nothing if talk has 1 participant', async () => {
      const endTalkEvent = new ActivityEndedEvent({
        time: engine.time,
        activity: new TalkActivity({
          participants: [player.activityParticipant]
        })
      });

      await talkJournalSystem.processEvent(endTalkEvent, engine);

      expect(player.journal.entries).toEqual([]);
    });
  });
});
