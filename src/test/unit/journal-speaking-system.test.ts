import { Action, ActionExecutingEvent, ActionExecutor } from 'engine/core/action';
import type { Time } from 'engine/core/time';
import { Character } from 'engine/modules/character';
import type { JournalOwner } from 'engine/modules/journal';
import { JournalSpeakingSystem, SpeakJournalEntry } from 'engine/modules/journal-speaking';
import { SpeakAction } from 'engine/modules/speaking';
import { MockEngine } from 'test/mock/mock-engine';

describe('Journal speaking system', () => {
  let journalSpeakingSystem: JournalSpeakingSystem;
  let engine: MockEngine;
  let actionExecutor: ActionExecutor;
  let journalOwner: JournalOwner;
  let time: Time;

  beforeEach(() => {
    journalSpeakingSystem = new JournalSpeakingSystem();
    engine = new MockEngine();
    actionExecutor = engine.addCharacter().requireComponent(ActionExecutor);
    journalOwner = engine.addJournalOwner();
    time = engine.time;
  });

  describe('ActionExecutingEvent', () => {
    it('should add entry to journal', async () => {
      const action = new SpeakAction({
        content: { literal: 'Hi, my name is Sestia' },
        quote: true,
        receivers: [journalOwner.requireEntity()]
      });

      await journalSpeakingSystem.processEvent(mockActionExecutingEvent(action), engine);

      expect(journalOwner.journal.unreadEntries).toEqual([
        new SpeakJournalEntry({
          time,
          content: { literal: 'Hi, my name is Sestia' },
          quote: true,
          speaker: actionExecutor.requireComponent(Character)
        })
      ]);
    });
  });

  function mockActionExecutingEvent(action: Action): ActionExecutingEvent {
    return new ActionExecutingEvent({ action, executor: actionExecutor, time });
  }
});
