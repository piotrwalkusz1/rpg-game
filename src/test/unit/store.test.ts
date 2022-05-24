import { FieldNarrationContext } from 'frontend/narration/narration-contexts/field-narration-context';
import { engine as $engine, narration as $narration, narrationContext as $narrationContext, refreshEngine } from 'frontend/store';
import { MockEngine } from 'test/mock/mock-engine';
import { mockField } from 'test/mock/mock-field';

describe('Store', () => {
  test('Refresh narration if state of engine has changed', async () => {
    $engine.set(new MockEngine().withPlayer());
    $narrationContext.set(new FieldNarrationContext(mockField()));
    let called = 0;

    setTimeout(() => {
      const unsubscribe = $narration.subscribe(() => called++);
      refreshEngine();
      unsubscribe();

      expect(called).toBe(2);
    });
  });

  test('Refresh narration if narration context has changed', async () => {
    $engine.set(new MockEngine().withPlayer());
    $narrationContext.set(new FieldNarrationContext(mockField()));
    let called = 0;

    setTimeout(() => {
      const unsubscribe = $narration.subscribe(() => called++);
      $narrationContext.set(new FieldNarrationContext(mockField()));
      unsubscribe();

      expect(called).toBe(2);
    });
  });
});