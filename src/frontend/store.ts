import { CDIContainer } from 'cdi-container';
import { initializeDemoGame } from 'game';
import { get } from 'svelte/store';
import { MotionUtils, TimeUtils } from 'utils';

export const gameStore = CDIContainer.create().gameStoreService.createStore({ engine: initializeDemoGame() });

export const {
  engine,
  blockedScreen,
  displayedLocation,
  selectedField,
  narrationContext,
  activatedBookmarkContext,
  narration,
  bookmarks,
  activatedBookmark,
  time,
  player,
  journal
} = gameStore;

export const animatedCurrentTime = MotionUtils.interpolate(get(engine).time, TimeUtils.interpolate);
