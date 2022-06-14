import { GameEngine } from 'engine/core/game';
import { Character } from 'engine/modules/character';
import { DialogBookmarkContext } from 'frontend/bookmark/bookmark-contexts/dialog-bookmark-context';
import { DialogBookmark } from 'frontend/bookmark/bookmarks/dialog-bookmark';

describe('DialogBookmark', () => {
  let engine: GameEngine;
  let character: Character;
  let dialogBookmark: DialogBookmark;

  beforeEach(() => {
    engine = new GameEngine();
    character = Character.create(engine);
    dialogBookmark = new DialogBookmark({ character, journalEntries: [] });
  });

  describe('background', () => {
    it('should return "YELLOW color', () => {
      expect(dialogBookmark.background).toEqual('YELLOW');
    });
  });

  describe('image', () => {
    it('should return image', () => {
      expect(dialogBookmark.image).toEqual('/images/ui/speech-bubble.png');
    });
  });

  describe('context', () => {
    it('should return DialogBookmarkContext', () => {
      expect(dialogBookmark.context).toEqual(new DialogBookmarkContext(character));
    });
  });
});
