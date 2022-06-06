import { Character } from 'engine/modules/character';
import { TalkOfferInteraction } from 'engine/modules/talk/talk-offer-interaction';
import { CharacterNarrationContext } from 'frontend/narration/narration-contexts/character-narration-context';
import { FieldNarrationContext } from 'frontend/narration/narration-contexts/field-narration-context';
import { InteractionNarrationOption } from 'frontend/narration/narration-options/interaction-narration-option';
import { TalkNarrationProvider } from 'frontend/narration/narration-providers/talk-narration-provider';
import { MockEngine } from 'test/mock/mock-engine';
import { mockField } from 'test/mock/mock-field';

describe('Talk narration provider', () => {
  let engine: MockEngine;

  beforeEach(() => {
    engine = new MockEngine();
  });

  describe('getNarrationOptions method', () => {
    it('should return empty array if narration context is other than CharacterContext', () => {
      const narrationOptions = new TalkNarrationProvider().getNarrationOptions({ context: new FieldNarrationContext(mockField()), engine });

      expect(narrationOptions).toEqual([]);
    });

    it('should return talk offer interaction option', () => {
      const character = engine.addCharacter().requireComponent(Character);

      const narrationOptions = new TalkNarrationProvider().getNarrationOptions({
        context: new CharacterNarrationContext(character),
        engine
      });

      expect(narrationOptions).toEqual([
        new InteractionNarrationOption({
          name: 'INTERACTION.TALK.NAME',
          image: '/images/ui/speech-bubble.png',
          interaction: new TalkOfferInteraction({ interlocutor: character })
        })
      ]);
    });
  });
});
