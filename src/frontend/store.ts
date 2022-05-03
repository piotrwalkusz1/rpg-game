import { initializeDemoGame } from 'demo/demo-game';
import type { Engine } from 'engine/core/ecs';
import { Field, FieldObject } from 'engine/core/field';
import { Player } from 'engine/core/game';
import { Time, TimeManager } from 'engine/core/time';
import { derived, Readable, Writable, writable } from 'svelte/store';
import { MotionUtils, TimeUtils } from 'utils';

const initialEngine: Engine = initializeDemoGame();

export const engine: Writable<Engine> = writable(initialEngine);

export const blockedScreen: Writable<boolean> = writable(false);

export const displayedLocation: Writable<Field> = writable(
  initialEngine.requireComponent(Player).requireComponent(FieldObject).field?.parentField
);

export const selectedField: Writable<Field | undefined> = writable(undefined);

export const animatedCurrentTime = MotionUtils.interpolate(initialEngine.requireComponent(TimeManager).time, TimeUtils.interpolate);

export const time: Readable<Time> = derived(engine, ($engine) => $engine.requireComponent(TimeManager).time);

export const player: Readable<Player> = derived(engine, ($engine) => $engine.requireComponent(Player));

export const refreshEngine = (): void => engine.update(($engine) => $engine);
