import type { PendingAction } from 'engine/core/action';
import type { Command } from 'engine/core/command';
import type { Engine } from 'engine/core/ecs';
import { GameLoopService } from 'engine/core/game';
import { differentTime, sameTime } from 'engine/core/time/time-utils';
import { TalkActivity } from 'engine/modules/talk';
import type { GameStore } from 'frontend/store/game-store';
import { getPlayer } from 'game';

export namespace GameService {
  export const processEvents = async (store: GameStore): Promise<void> => {
    store.refreshEngine();
    while (store.getEngine().nextEvent) {
      await processEventsUntilTimeChange(store);
      if (isPlayerActionRequired(store.getEngine())) {
        break;
      }
    }
  };

  const processEventsUntilTimeChange = async (store: GameStore): Promise<void> => {
    if (differentTime(store.getEngine().nextEventTime, store.getTime())) {
      await processNextEvent(store);
    }
    while (sameTime(store.getEngine().nextEventTime, store.getTime())) {
      await processNextEvent(store);
    }
  };

  const processNextEvent = async (store: GameStore): Promise<void> => {
    await GameLoopService.processNextEvent(store.getEngine());
    store.refreshEngine();
  };

  const isPlayerActionRequired = (engine: Engine): boolean => {
    return !playerPendingAction(engine) && !playerPendingCommand(engine) && !playerTalkActivity(engine);
  };

  const playerPendingAction = (engine: Engine): PendingAction | undefined => getPlayer(engine).pendingAction;

  const playerPendingCommand = (engine: Engine): Command | undefined => getPlayer(engine).pendingCommand;

  const playerTalkActivity = (engine: Engine): TalkActivity | undefined => getPlayer(engine).activityParticipant.getActivity(TalkActivity);
}
