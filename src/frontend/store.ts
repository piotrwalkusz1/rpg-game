import { initializeDemoGame } from 'demo/demo-game';
import type { Engine } from 'engine/core/ecs';
import type { Field } from 'engine/core/field';
import { Player } from 'engine/core/game';
import { TimeManager } from 'engine/core/time';
import { derived, Readable, Writable, writable } from 'svelte/store';
import { MotionUtils, TimeUtils } from 'utils';

const initialEngine: Engine = initializeDemoGame();

export const engine: Writable<Engine> = writable(initialEngine);

export const animatedCurrentTime = MotionUtils.interpolate(initialEngine.requireComponent(TimeManager).time, TimeUtils.interpolate);

export const blockedScreen: Writable<boolean> = writable(false);

export const player: Readable<Player> = derived(engine, ($engine) => $engine.requireComponent(Player));

export const selectedField: Writable<Field | undefined> = writable(undefined);

export const resetStore = (): void => {
  const newEngine = initializeDemoGame();
  engine.set(newEngine);
  animatedCurrentTime.set(newEngine.requireComponent(TimeManager).time, 0);
  blockedScreen.set(false);
  selectedField.set(undefined);
};
