import { CDIContainer } from 'cdi-container';
import { Field, getParentField, getX, getY, rootField, subFieldAt } from 'engine/core/field';
import { GameEngine, GameEvent } from 'engine/core/game';
import { NarrationService } from 'frontend/narration';
import { FieldNarrationContext } from 'frontend/narration/narration-contexts/field-narration-context';
import type { GameStore } from 'frontend/store/game-store';
import { GameBuilder, getPlayer, Player } from 'game';

describe('Movement', () => {
  class MockEvent extends GameEvent {}

  let engine: GameEngine;
  let player: Player;
  let world: Field;
  let store: GameStore;

  beforeEach(() => {
    engine = new GameBuilder().playerPosition([2, 1]).build();
    world = rootField(engine);
    player = getPlayer(engine);
    store = CDIContainer.create().gameStoreService.createStore({ engine });
  });

  test('Move to adjoin field', async () => {
    const narrationOption = NarrationService.getNarration({ context: new FieldNarrationContext(subFieldAt(world, [3, 1])), engine })
      .options[0];
    await NarrationService.executeOnNarrationOptionClick(narrationOption, store);

    expect(getParentField(player)).toBe(world);
    expect(getX(player)).toEqual(3);
    expect(getY(player)).toEqual(1);
  });

  test('Move to distant field', async () => {
    const narrationOption = NarrationService.getNarration({ context: new FieldNarrationContext(subFieldAt(world, [4, 3])), engine })
      .options[0];
    await NarrationService.executeOnNarrationOptionClick(narrationOption, store);

    expect(getParentField(player)).toBe(world);
    expect(getX(player)).toEqual(4);
    expect(getY(player)).toEqual(3);
  });

  test('Move when events queue is not empty', async () => {
    engine.addEvent(new MockEvent({ time: new Date(engine.time) }));

    const narrationOption = NarrationService.getNarration({ context: new FieldNarrationContext(subFieldAt(world, [3, 1])), engine })
      .options[0];
    await NarrationService.executeOnNarrationOptionClick(narrationOption, store);

    expect(getParentField(player)).toBe(world);
    expect(getX(player)).toEqual(3);
    expect(getY(player)).toEqual(1);
  });
});
