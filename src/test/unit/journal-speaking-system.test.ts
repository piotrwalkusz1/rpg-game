import { CDIContainer } from 'cdi-container';
import { Entity } from 'engine/core/ecs';
import type { GameEngine } from 'engine/core/game';
import type { Time } from 'engine/core/time';
import { Character } from 'engine/modules/character';
import { InteractionEvent } from 'engine/modules/interaction';
import { JournalOwner } from 'engine/modules/journal';
import { JournalSpeakingSystem, SpeakJournalEntry } from 'engine/modules/journal-extensions/journal-speaking';
import { SpeakInteraction } from 'engine/modules/speaking';
import { GameBuilder } from 'game';

describe('Journal speaking system', () => {
  let journalSpeakingSystem: JournalSpeakingSystem;
  let engine: GameEngine;
  let speaker: Character;
  let journalOwner: JournalOwner;
  let time: Time;

  beforeEach(() => {
    journalSpeakingSystem = new JournalSpeakingSystem();
    engine = CDIContainer.default().get(GameBuilder).build();
    speaker = Character.create(engine);
    journalOwner = engine.addEntityWithComponent(new JournalOwner());
    time = engine.time;
  });

  describe('ActionExecutingEvent', () => {
    it('should add entry to journal', async () => {
      await journalSpeakingSystem.processEvent(
        new InteractionEvent({
          time,
          executor: speaker,
          interaction: new SpeakInteraction({ receivers: [journalOwner], content: { literal: 'Hi, my name is Sestia' }, quote: true })
        }),
        engine
      );

      expect(journalOwner.journal.unreadEntries).toEqual([
        new SpeakJournalEntry({
          time,
          content: { literal: 'Hi, my name is Sestia' },
          quote: true,
          speaker: speaker.requireComponent(Character)
        })
      ]);
    });

    it('should not add entry to journal if no character component', async () => {
      const speakerEntity = speaker.entity;
      speakerEntity.removeComponent(Character);

      await journalSpeakingSystem.processEvent(
        new InteractionEvent({
          time,
          executor: speakerEntity,
          interaction: new SpeakInteraction({ receivers: [journalOwner], content: { literal: 'Hi, my name is Sestia' }, quote: true })
        }),
        engine
      );

      expect(journalOwner.journal.unreadEntries).toEqual([]);
    });

    it('should do nothing if receiver is not journal owner', async () => {
      await journalSpeakingSystem.processEvent(
        new InteractionEvent({
          time,
          executor: speaker,
          interaction: new SpeakInteraction({ receivers: [new Entity()], content: { literal: 'Hi, my name is Sestia' }, quote: true })
        }),
        engine
      );
    });
  });
});
