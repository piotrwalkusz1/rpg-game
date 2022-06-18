import type { ActivityParticipant } from 'engine/core/activity';
import { ActivityEndedEvent } from 'engine/core/activity/activity-event';
import type { ECSEvent } from 'engine/core/ecs';
import { GameEngine, GameSystem } from 'engine/core/game';
import type { Time } from 'engine/core/time';
import { Character } from 'engine/modules/character';
import { JournalOwner } from 'engine/modules/journal/journal-owner';
import { TalkActivity } from 'engine/modules/talk';
import { CharacterJournalEntry } from '../journal-character';

export class TalkJournalSystem extends GameSystem {
  override async processEvent(event: ECSEvent, engine: GameEngine): Promise<void> {
    if (event instanceof ActivityEndedEvent && event.activity instanceof TalkActivity) {
      this.handleEndTalkEvent(event.activity, engine.time);
    }
  }

  private handleEndTalkEvent(talk: TalkActivity, time: Time): void {
    const participants = talk.participants;
    if (participants.length !== 2) {
      return;
    }
    this.tryAddTalkEndedJournalEvent(participants[0], participants[1], time);
    this.tryAddTalkEndedJournalEvent(participants[1], participants[0], time);
  }

  private tryAddTalkEndedJournalEvent(
    participantWithJournal: ActivityParticipant,
    otherParticipant: ActivityParticipant,
    time: Time
  ): void {
    const journalOwner = participantWithJournal.getComponent(JournalOwner);
    const character = otherParticipant.getComponent(Character);
    if (journalOwner && character) {
      journalOwner.addEntry(new CharacterJournalEntry({ character, text: 'JOURNAL.ENTRY.TALK_END', time }));
    }
  }
}
