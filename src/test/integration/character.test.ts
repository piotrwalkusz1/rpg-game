import { CDIContainer } from 'cdi-container';
import { Character } from 'engine/modules/character';
import { NarrationService } from 'frontend/narration';
import { CharacterNarrationContext } from 'frontend/narration/narration-contexts/character-narration-context';
import { FieldNarrationContext } from 'frontend/narration/narration-contexts/field-narration-context';
import { CharacterNarrationOption } from 'frontend/narration/narration-options/character-narration-option';
import { GameStoreService } from 'frontend/store/game-store-service';
import { GameBuilder, getPlayer } from 'game';
import { get } from 'svelte/store';
import { mockField } from 'test/mock/mock-field';
import { ArrayUtils } from 'utils';

describe('Character narration', () => {
  test('Display character narration option', () => {
    const engine = new GameBuilder().build();
    const field = mockField();
    const character = Character.create(engine);
    getPlayer(engine).field = field;
    character.field = field;

    const narrationOptions = NarrationService.getNarration({ context: new FieldNarrationContext(field), engine })?.options;

    expect(narrationOptions).toContainEqual(new CharacterNarrationOption({ character }));
  });

  test('Do not display character narration option for player character', () => {
    const engine = new GameBuilder().build();
    const field = mockField();
    getPlayer(engine).field = field;

    const narrationOptions = NarrationService.getNarration({ context: new FieldNarrationContext(field), engine })?.options || [];

    expect(ArrayUtils.filterInstanceOf(narrationOptions, CharacterNarrationOption)).toEqual([]);
  });

  test('Set character narration context after clicking on character narration option', async () => {
    const engine = new GameBuilder().build();
    const store = CDIContainer.create().get(GameStoreService).createStore({ engine });
    const field = mockField();
    const character = Character.create(engine);
    character.name = { literal: 'Eladin' };
    character.field = field;

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
    const engine = new GameBuilder().build();
    const character = Character.create(engine);
    character.presentation.name = { literal: 'Sestia' };
    character.presentation.avatar = '/images/characters/002_Sestia.png';

    const narration = NarrationService.getNarration({ context: new CharacterNarrationContext(character), engine });

    expect(narration?.title).toEqual({ literal: 'Sestia' });
    expect(narration?.image).toEqual('/images/characters/002_Sestia.png');
    expect(narration?.description).toBeUndefined();
  });
});
