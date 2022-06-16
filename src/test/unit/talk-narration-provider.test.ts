import { CDIContainer } from 'cdi-container';
import { rootField, subFieldAt } from 'engine/core/field';
import type { GameEngine } from 'engine/core/game';
import { Character } from 'engine/modules/character';
import type { TalkService } from 'engine/modules/talk/talk-service';
import { CharacterNarrationContext } from 'frontend/narration/narration-contexts/character-narration-context';
import { FieldNarrationContext } from 'frontend/narration/narration-contexts/field-narration-context';
import { TalkNarrationOption } from 'frontend/narration/narration-options/talk-narration-option';
import { TalkNarrationProvider } from 'frontend/narration/narration-providers/talk-narration-provider';
import { GameBuilder } from 'game';
import { mockField } from 'test/mock/mock-field';
import { IMock, It, Mock } from 'typemoq';

describe('Talk narration provider', () => {
  let talkService: IMock<TalkService>;
  let talkNarrationProvider: TalkNarrationProvider;
  let engine: GameEngine;
  let character: Character;

  beforeEach(() => {
    talkService = Mock.ofType<TalkService>();
    talkNarrationProvider = new TalkNarrationProvider(talkService.object);
    engine = CDIContainer.default().get(GameBuilder).build();
    character = Character.create(engine, { field: subFieldAt(rootField(engine), [0, 0]) });
  });

  describe('getNarrationOptions method', () => {
    it('should return talk offer interaction option', () => {
      talkService.setup((instance) => instance.canOfferTalk(It.isAny(), It.isAny())).returns(() => true);

      const narrationOptions = talkNarrationProvider.getNarrationOptions({
        context: new CharacterNarrationContext(character),
        engine
      });

      expect(narrationOptions).toEqual([new TalkNarrationOption({ talker: character.talker })]);
    });

    it('should return empty array if narration context is other than CharacterContext', () => {
      talkService.setup((instance) => instance.canOfferTalk(It.isAny(), It.isAny())).returns(() => true);

      const narrationOptions = talkNarrationProvider.getNarrationOptions({ context: new FieldNarrationContext(mockField()), engine });

      expect(narrationOptions).toEqual([]);
    });

    it('should return talk offer interaction option', () => {
      talkService.setup((instance) => instance.canOfferTalk(It.isAny(), It.isAny())).returns(() => false);

      const narrationOptions = talkNarrationProvider.getNarrationOptions({
        context: new CharacterNarrationContext(character),
        engine
      });

      expect(narrationOptions).toEqual([]);
    });
  });
});
