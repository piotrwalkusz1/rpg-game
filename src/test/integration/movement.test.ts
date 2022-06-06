import { Field, getParentField, getX, getY, subFieldAt } from 'engine/core/field';
import type { Player } from 'engine/core/game';
import { NarrationService } from 'frontend/narration';
import { FieldNarrationContext } from 'frontend/narration/narration-contexts/field-narration-context';
import { GameStore } from 'frontend/store';
import { MockEngine } from 'test/mock/mock-engine';
import { mockRectField } from 'test/mock/mock-field';

describe('Movement', () => {
  let engine: MockEngine;
  let player: Player;
  let world: Field;
  let store: GameStore;

  beforeEach(() => {
    engine = new MockEngine();
    world = mockRectField(5, 5);
    player = engine.addPlayer({ field: subFieldAt(world, 2, 1) });
    store = new GameStore({ engine });
  });

  test('Move to adjoin field', async () => {
    const narrationOption = NarrationService.getNarration({ context: new FieldNarrationContext(subFieldAt(world, 3, 1)), engine })
      .options[0];
    await NarrationService.executeOnNarrationOptionClick(narrationOption, store);

    expect(getParentField(player)).toBe(world);
    expect(getX(player)).toEqual(3);
    expect(getY(player)).toEqual(1);
  });

  test('Move to distant field', async () => {
    const narrationOption = NarrationService.getNarration({ context: new FieldNarrationContext(subFieldAt(world, 4, 3)), engine })
      .options[0];
    await NarrationService.executeOnNarrationOptionClick(narrationOption, store);

    expect(getParentField(player)).toBe(world);
    expect(getX(player)).toEqual(4);
    expect(getY(player)).toEqual(3);
  });
});
