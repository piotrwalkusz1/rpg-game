import { rootField, subFieldAt } from 'engine/core/field';
import { Character } from 'engine/modules/character';
import { CharacterJournalEntry } from 'engine/modules/journal-extensions/journal-character';
import { DialogBookmarkContext } from 'frontend/bookmark/bookmark-contexts/dialog-bookmark-context';
import { DialogBookmark } from 'frontend/bookmark/bookmarks/dialog-bookmark';
import { FieldNarrationContext } from 'frontend/narration/narration-contexts/field-narration-context';
import { engine as $engine, GameStore, gameStore, narration as $narration, narrationContext as $narrationContext } from 'frontend/store';
import { GameBuilder, getPlayer } from 'game';
import { get } from 'svelte/store';
import { mockField } from 'test/mock/mock-field';

describe('GameStore', () => {
  describe('narration', () => {
    it('should return narration if narration context is set', () => {
      const engine = new GameBuilder().build();
      const store = new GameStore({ engine });
      store.narrationContext.set(new FieldNarrationContext(subFieldAt(rootField(engine), [3, 1])));

      expect(get(store.narration)).not.toBeUndefined();
    });

    it('should return undefined if narration context is not set', () => {
      const engine = new GameBuilder().build();
      const store = new GameStore({ engine });

      expect(get(store.narration)).toBeUndefined();
    });
  });

  describe('player', () => {
    it('should return player', () => {
      const engine = new GameBuilder().build();
      const store = new GameStore({ engine });

      expect(get(store.player)).toBe(getPlayer(engine));
    });
  });

  describe('time', () => {
    it('should return time', () => {
      const engine = new GameBuilder().build();
      const store = new GameStore({ engine });

      expect(get(store.time)).toBe(engine.time);
    });
  });

  describe('journal', () => {
    it('should return journal of player', () => {
      const engine = new GameBuilder().build();
      const store = new GameStore({ engine });

      expect(get(store.journal)).toBe(getPlayer(engine).journal);
    });
  });

  describe('displayedLocation', () => {
    it('should return undefined if player has no field', () => {
      const engine = new GameBuilder().build();
      getPlayer(engine).field = undefined;
      const store = new GameStore({ engine });

      expect(get(store.displayedLocation)).toBeUndefined();
    });
  });

  describe('activatedBookmark', () => {
    it('should return bookmark with activated bookmark context', () => {
      const engine = new GameBuilder().build();
      const character = Character.create(engine);
      getPlayer(engine).journal.addEntry(new CharacterJournalEntry({ text: { literal: 'Hi' }, character, time: engine.time }));
      const store = new GameStore({ engine });
      store.activatedBookmarkContext.set(new DialogBookmarkContext(character));

      expect(get(store.activatedBookmark)).toEqual(
        new DialogBookmark({
          character,
          journalEntries: [new CharacterJournalEntry({ text: { literal: 'Hi' }, character, time: engine.time })]
        })
      );
    });

    it('should return undefined if activatedBookmarkContext is undefined', () => {
      const engine = new GameBuilder().build();
      const character = Character.create(engine);
      getPlayer(engine).journal.addEntry(new CharacterJournalEntry({ text: { literal: 'Hi' }, character, time: engine.time }));
      const store = new GameStore({ engine });

      expect(get(store.activatedBookmark)).toBeUndefined();
    });
  });
});

describe('Store', () => {
  test('Refresh narration if state of engine has changed', async () => {
    $engine.set(new GameBuilder().build());
    $narrationContext.set(new FieldNarrationContext(mockField()));
    let called = 0;

    setTimeout(() => {
      const unsubscribe = $narration.subscribe(() => called++);
      gameStore.refreshEngine();
      unsubscribe();

      expect(called).toBe(2);
    });
  });

  test('Refresh narration if narration context has changed', async () => {
    $engine.set(new GameBuilder().build());
    $narrationContext.set(new FieldNarrationContext(mockField()));
    let called = 0;

    setTimeout(() => {
      const unsubscribe = $narration.subscribe(() => called++);
      $narrationContext.set(new FieldNarrationContext(mockField()));
      unsubscribe();

      expect(called).toBe(2);
    });
  });
});
