import type { Field } from 'engine/core/field';
import type { GameEngine } from 'engine/core/game';
import type { Time } from 'engine/core/time';
import type { Journal } from 'engine/modules/journal';
import { getPlayer, initializeDemoGame, Player } from 'game';
import { derived, get, Readable, Writable, writable } from 'svelte/store';
import { MotionUtils, TimeUtils } from 'utils';
import type { Dialog } from './dialog';
import { Narration, NarrationService } from './narration';
import type { NarrationContext } from './narration/narration-context';

export class GameStore {
  readonly engine: Writable<GameEngine>;
  readonly blockedScreen: Writable<boolean>;
  readonly displayedLocation: Writable<Field>;
  readonly selectedField: Writable<Field | undefined>;
  readonly narrationContext: Writable<NarrationContext | undefined>;
  readonly displayedDialog: Writable<Dialog | undefined>;
  readonly narration: Readable<Narration | undefined>;
  readonly time: Readable<Time>;
  readonly player: Readable<Player>;
  readonly journal: Readable<Journal>;

  constructor(params?: { engine?: GameEngine }) {
    this.engine = writable(params?.engine || initializeDemoGame());
    this.blockedScreen = writable(false);
    this.displayedLocation = writable(getPlayer(get(this.engine)).field?.parentField);
    this.selectedField = writable(undefined);
    this.narrationContext = writable(undefined);
    this.displayedDialog = writable(undefined);
    this.narration = derived([this.narrationContext, this.engine], ([$narrationContext, $engine]) =>
      $narrationContext ? NarrationService.getNarration({ context: $narrationContext, engine: $engine }) : undefined
    );
    this.time = derived(this.engine, ($engine) => $engine.time);
    this.player = derived(this.engine, ($engine) => getPlayer($engine));
    this.journal = derived(this.player, ($player) => $player.journal);
  }

  refreshEngine(): void {
    this.engine.update(($engine) => $engine);
  }
}

export const gameStore = new GameStore();

export const {
  engine,
  blockedScreen,
  displayedLocation,
  selectedField,
  narrationContext,
  displayedDialog,
  narration,
  time,
  player,
  journal
} = gameStore;

export const animatedCurrentTime = MotionUtils.interpolate(get(engine).time, TimeUtils.interpolate);

export const refreshEngine = () => gameStore.refreshEngine();
