import { ActionExecutingEvent } from 'engine/core/action';
import { Entity } from 'engine/core/ecs';
import type { GameEngine } from 'engine/core/game';
import type { Time } from 'engine/core/time';
import { Character } from 'engine/modules/character';
import { JournalOwner } from 'engine/modules/journal';
import { JournalSpeakingSystem, SpeakJournalEntry } from 'engine/modules/journal-extensions/journal-speaking';
import { SpeakAction } from 'engine/modules/speaking';
import { GameBuilder } from 'game';

describe('Journal speaking system', () => {
  let journalSpeakingSystem: JournalSpeakingSystem;
  let engine: GameEngine;
  let speaker: Character;
  let journalOwner: JournalOwner;
  let time: Time;

  beforeEach(() => {
    journalSpeakingSystem = new JournalSpeakingSystem();
    engine = new GameBuilder().build();
    speaker = Character.create(engine);
    journalOwner = engine.addEntityWithComponent(new JournalOwner());
    time = engine.time;
  });

  describe('ActionExecutingEvent', () => {
    it('should add entry to journal', async () => {
      const action = new SpeakAction({
        content: { literal: 'Hi, my name is Sestia' },
        quote: true,
        receivers: [journalOwner]
      });

      await journalSpeakingSystem.processEvent(new ActionExecutingEvent({ action, executor: speaker, time }), engine);

      expect(journalOwner.journal.unreadEntries).toEqual([
        new SpeakJournalEntry({
          time,
          content: { literal: 'Hi, my name is Sestia' },
          quote: true,
          speaker: speaker.requireComponent(Character)
        })
      ]);
    });

    it('should not add entry to journal if no speaker component', async () => {
      const action = new SpeakAction({
        content: { literal: 'Hi, my name is Sestia' },
        quote: true,
        receivers: [journalOwner]
      });
      speaker.entity.removeComponent(Character);

      await journalSpeakingSystem.processEvent(new ActionExecutingEvent({ action, executor: speaker.actionExecutor, time }), engine);

      expect(journalOwner.journal.unreadEntries).toEqual([]);
    });

    it('should do nothing if receiver is not journal owner', async () => {
      const action = new SpeakAction({
        content: { literal: 'Hi, my name is Sestia' },
        quote: true,
        receivers: [new Entity()]
      });

      await journalSpeakingSystem.processEvent(new ActionExecutingEvent({ action, executor: speaker.actionExecutor, time }), engine);
    });
  });
});
