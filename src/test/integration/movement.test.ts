import { getParentField, getX, getY, subFieldAt } from 'engine/core/field';
import { NarrationService } from 'frontend/narration';
import { FieldNarrationContext } from 'frontend/narration/narration-contexts/field-narration-context';
import { MockedEngine } from 'test/mock/mock-engine';
import { mockRectField } from 'test/mock/mock-field';

describe('Movement', () => {
  test('Move to adjoin field', async () => {
    const engine = new MockedEngine();
    const world = mockRectField(5, 5);
    const player = engine.addPlayer({ field: subFieldAt(world, 2, 1) });

    await NarrationService.getNarration({ context: new FieldNarrationContext(subFieldAt(world, 3, 1)), engine })?.options[0].onClick(
      engine
    );

    expect(getParentField(player)).toBe(world);
    expect(getX(player)).toEqual(3);
    expect(getY(player)).toEqual(1);
  });

  test('Move to distant field', async () => {
    const engine = new MockedEngine();
    const world = mockRectField(5, 5);
    const player = engine.addPlayer({ field: subFieldAt(world, 2, 1) });

    await NarrationService.getNarration({ context: new FieldNarrationContext(subFieldAt(world, 4, 3)), engine })?.options[0].onClick(
      engine
    );

    expect(getParentField(player)).toBe(world);
    expect(getX(player)).toEqual(4);
    expect(getY(player)).toEqual(3);
  });
});
