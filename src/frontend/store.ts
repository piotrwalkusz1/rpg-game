import { initializeDemoGame } from 'demo/demo-game';
import type { Engine } from 'engine/core/ecs';
import { Field, FieldObject } from 'engine/core/field';
import { Player } from 'engine/core/game';
import { Time, TimeManager } from 'engine/core/time';
import { derived, get, Readable, Writable, writable } from 'svelte/store';
import { MotionUtils, TimeUtils } from 'utils';
import { Narration, NarrationService } from './narration';
import type { NarrationContext } from './narration/narration-context';

export const engine: Writable<Engine> = writable(initializeDemoGame());

export const blockedScreen: Writable<boolean> = writable(false);

export const displayedLocation: Writable<Field> = writable(
  get(engine).requireComponent(Player).requireComponent(FieldObject).field?.parentField
);

export const selectedField: Writable<Field | undefined> = writable(undefined);

export const narrationContext: Writable<NarrationContext | undefined> = writable(undefined);

export const narration: Readable<Narration | undefined> = derived(narrationContext, ($narrationContext) =>
  $narrationContext ? NarrationService.getNarration({ context: $narrationContext, engine: get(engine) }) : undefined
);

export const animatedCurrentTime = MotionUtils.interpolate(get(engine).requireComponent(TimeManager).time, TimeUtils.interpolate);

export const time: Readable<Time> = derived(engine, ($engine) => $engine.requireComponent(TimeManager).time);

export const player: Readable<Player> = derived(engine, ($engine) => $engine.requireComponent(Player));

export const refreshEngine = (): void => engine.update(($engine) => $engine);
