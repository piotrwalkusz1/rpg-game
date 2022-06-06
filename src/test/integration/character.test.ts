import { Character } from 'engine/modules/character';
import { NarrationService } from 'frontend/narration';
import { CharacterNarrationContext } from 'frontend/narration/narration-contexts/character-narration-context';
import { FieldNarrationContext } from 'frontend/narration/narration-contexts/field-narration-context';
import { CharacterNarrationOption } from 'frontend/narration/narration-options/character-narration-option';
import { GameStore } from 'frontend/store';
import { get } from 'svelte/store';
import { MockEngine } from 'test/mock/mock-engine';
import { mockField } from 'test/mock/mock-field';
import { ArrayUtils } from 'utils';

describe('Character narration', () => {
  test('Display character narration option', () => {
    const engine = new MockEngine();
    engine.addPlayer();
    const field = mockField();
    const character = engine.addCharacter({ field }).requireComponent(Character);

    const narrationOptions = NarrationService.getNarration({ context: new FieldNarrationContext(field), engine })?.options;

    expect(narrationOptions).toContainEqual(new CharacterNarrationOption({ character }));
  });

  test('Do not display character narration option for player character', () => {
    const engine = new MockEngine();
    const field = mockField();
    engine.addPlayer({ field });

    const narrationOptions = NarrationService.getNarration({ context: new FieldNarrationContext(field), engine })?.options || [];

    expect(ArrayUtils.filterInstanceOf(narrationOptions, CharacterNarrationOption)).toEqual([]);
  });

  test('Set character narration context after clicking on character narration option', async () => {
    const engine = new MockEngine();
    engine.addPlayer();
    const store = new GameStore({ engine });
    const field = mockField();
    const character = engine.addCharacter({ field, name: 'Eladin' }).requireComponent(Character);

    const narrationOption = NarrationService.getNarration({ context: new FieldNarrationContext(field), engine }).options.find(
      (option) => option instanceof CharacterNarrationOption
    );
    if (narrationOption === undefined) {
      throw new Error('Expected narrationOption to be defined');
    }
    await NarrationService.executeOnNarrationOptionClick(narrationOption, store);

    expect(get(store.narrationContext)).toEqual(new CharacterNarrationContext(character));
  });

  test('Display character narration', () => {
    const engine = new MockEngine();
    engine.addPlayer();
    const character = engine.addCharacter({ name: 'Sestia', avatar: '/images/characters/002_Sestia.png' }).requireComponent(Character);

    const narration = NarrationService.getNarration({ context: new CharacterNarrationContext(character), engine });

    expect(narration?.title).toEqual({ literal: 'Sestia' });
    expect(narration?.image).toEqual('/images/characters/002_Sestia.png');
    expect(narration?.description).toBeUndefined();
  });
});
