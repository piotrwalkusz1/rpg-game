import { CDIContainer } from 'cdi-container';
import { Field, getParentField, getX, getY, rootField, subFieldAt } from 'engine/core/field';
import { GameEngine, GameEvent } from 'engine/core/game';
import { NarrationService } from 'frontend/narration';
import { FieldNarrationContext } from 'frontend/narration/narration-contexts/field-narration-context';
import type { GameStore } from 'frontend/store/game-store';
import { GameStoreService } from 'frontend/store/game-store-service';
import { GameBuilder, getPlayer, Player } from 'game';

describe('Movement', () => {
  class MockEvent extends GameEvent {}

  let cdiContainer: CDIContainer;
  let engine: GameEngine;
  let player: Player;
  let world: Field;
  let store: GameStore;
  let narrationService: NarrationService;

  beforeEach(() => {
    cdiContainer = CDIContainer.default();
    engine = cdiContainer.get(GameBuilder).playerPosition([2, 1]).build();
    world = rootField(engine);
    player = getPlayer(engine);
    store = cdiContainer.get(GameStoreService).createStore({ engine });
    narrationService = cdiContainer.get(NarrationService);
  });

  test('Move to adjoin field', async () => {
    const narrationOption = narrationService.getNarration({ context: new FieldNarrationContext(subFieldAt(world, [3, 1])), engine })
      .options[0];

    await narrationService.executeOnNarrationOptionClick(narrationOption, store);

    expect(getParentField(player)).toBe(world);
    expect(getX(player)).toEqual(3);
    expect(getY(player)).toEqual(1);
  });

  test('Move to distant field', async () => {
    const narrationOption = narrationService.getNarration({ context: new FieldNarrationContext(subFieldAt(world, [4, 3])), engine })
      .options[0];
    await narrationService.executeOnNarrationOptionClick(narrationOption, store);

    expect(getParentField(player)).toBe(world);
    expect(getX(player)).toEqual(4);
    expect(getY(player)).toEqual(3);
  });

  test('Move when events queue is not empty', async () => {
    engine.addEvent(new MockEvent({ time: new Date(engine.time) }));

    const narrationOption = narrationService.getNarration({ context: new FieldNarrationContext(subFieldAt(world, [3, 1])), engine })
      .options[0];
    await narrationService.executeOnNarrationOptionClick(narrationOption, store);

    expect(getParentField(player)).toBe(world);
    expect(getX(player)).toEqual(3);
    expect(getY(player)).toEqual(1);
  });
});
