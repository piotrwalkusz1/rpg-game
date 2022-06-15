import { CDIContainer } from 'cdi-container';
import { initializeDemoGame } from 'game';
import { MotionUtils, TimeUtils } from 'utils';
import { GameStoreService } from './store/game-store-service';

export const cdiContainer = CDIContainer.default();
export const gameStore = cdiContainer.get(GameStoreService).createStore({ engine: initializeDemoGame(cdiContainer) });

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
} = gameStore.props;

export const animatedCurrentTime = MotionUtils.interpolate(gameStore.engine.time, TimeUtils.interpolate);
