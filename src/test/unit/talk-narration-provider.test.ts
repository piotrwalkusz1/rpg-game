import { CDIContainer } from 'cdi-container';
import type { GameEngine } from 'engine/core/game';
import { Character } from 'engine/modules/character';
import { OfferInteraction } from 'engine/modules/offer';
import { TalkOffer } from 'engine/modules/talk/talk-offer';
import { CharacterNarrationContext } from 'frontend/narration/narration-contexts/character-narration-context';
import { FieldNarrationContext } from 'frontend/narration/narration-contexts/field-narration-context';
import { InteractionNarrationOption } from 'frontend/narration/narration-options/interaction-narration-option';
import { TalkNarrationProvider } from 'frontend/narration/narration-providers/talk-narration-provider';
import { GameBuilder, getPlayer } from 'game';
import { mockField } from 'test/mock/mock-field';

describe('Talk narration provider', () => {
  let engine: GameEngine;
  let character: Character;

  beforeEach(() => {
    engine = CDIContainer.default().get(GameBuilder).build()
    character = Character.create(engine);
  });

  describe('getNarrationOptions method', () => {
    it('should return empty array if narration context is other than CharacterContext', () => {
      const narrationOptions = new TalkNarrationProvider().getNarrationOptions({ context: new FieldNarrationContext(mockField()), engine });

      expect(narrationOptions).toEqual([]);
    });

    it('should return talk offer interaction option', () => {
      const narrationOptions = new TalkNarrationProvider().getNarrationOptions({
        context: new CharacterNarrationContext(character),
        engine
      });

      expect(narrationOptions).toEqual([
        new InteractionNarrationOption({
          name: 'INTERACTION.TALK.NAME',
          image: '/images/ui/speech-bubble.png',
          interaction: new OfferInteraction(new TalkOffer(getPlayer(engine).talker, character.talker))
        })
      ]);
    });
  });
});
