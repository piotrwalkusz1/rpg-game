import { GameEngine } from 'engine/core/game';
import { Character } from 'engine/modules/character';
import { CharacterJournalContext, CharacterJournalEntry } from 'engine/modules/journal-extensions/journal-character';

describe('CharacterJournalEntry', () => {
  describe('text', () => {
    it('should return text', () => {
      const engine = new GameEngine();
      const character = Character.create(engine);
      const entry = new CharacterJournalEntry({ text: { literal: 'Hello' }, character, time: engine.time });

      expect(entry.text).toEqual({ literal: 'Hello' });
    });
  });

  describe('contexts', () => {
    it('should return CharacterJournalContext', () => {
      const engine = new GameEngine();
      const character = Character.create(engine);
      const entry = new CharacterJournalEntry({ text: { literal: 'Hello' }, character, time: engine.time });

      expect(entry.contexts).toEqual([new CharacterJournalContext(character)]);
    });
  });
});
