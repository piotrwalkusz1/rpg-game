import type { Character } from 'engine/modules/character';
import { BookmarkContext, DialogBookmarkContext } from 'frontend/bookmark';
import { Mock } from 'typemoq';

describe('DialogBookmarkContext', () => {
  describe('equal', () => {
    it('should return true if other context is DialogBookmarkContext with the same character', () => {
      const character = Mock.ofType<Character>().object;
      const context = new DialogBookmarkContext(character);

      expect(context.equals(new DialogBookmarkContext(character))).toBe(true);
    });

    it('should return false if other context is DialogBookmarkContext with other character', () => {
      const firstCharacter = Mock.ofType<Character>().object;
      const secondCharacter = Mock.ofType<Character>().object;
      const context = new DialogBookmarkContext(firstCharacter);

      expect(context.equals(new DialogBookmarkContext(secondCharacter))).toBe(false);
    });

    it('should return false if other context is not DialogBookmarkContext', () => {
      const character = Mock.ofType<Character>().object;
      const context = new DialogBookmarkContext(character);

      expect(context.equals(Mock.ofType<BookmarkContext>().object)).toBe(false);
    });
  });
});
