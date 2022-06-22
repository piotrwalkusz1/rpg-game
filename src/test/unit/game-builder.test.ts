import { RectFieldPosition, rootField } from 'engine/core/field';
import type { ImageUrl } from 'engine/core/resources';
import { Character } from 'engine/modules/character';
import { GameBuilder } from 'game';
import { isLiteral } from 'i18n/translatable-text';

describe('GameBuilder', () => {
  describe('addCharacter', () => {
    it('should add character', () => {
      const gameBuilder = new GameBuilder([], []);

      gameBuilder.addCharacter({ name: 'Wolf', avatar: 'wolf.png' as ImageUrl, position: [2, 3] });

      const engine = gameBuilder.build();
      const character = engine.getComponents(Character).filter((character) => isLiteral(character.name, 'Wolf'))[0];
      expect(character.avatar).toEqual('wolf.png');
      expect(character.field?.position).toEqual(new RectFieldPosition(rootField(engine), 2, 3));
    });
  });
});
