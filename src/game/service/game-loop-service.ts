import { NarrationService } from '../../narration/service/narration-service';
import type { GameContext } from '../model/game-context';

export namespace GameLoopService {
  export const processNextEvent = (context: GameContext): void => {
    const event = context.popNextGameEvent();
    if (!event) {
      return;
    }
    context.setCurrentTime(event.time);
    const result = event.process(context);
    switch (result.type) {
      case 'PROCESS_NEXT_EVENT': {
        processNextEvent(context);
        break;
      }
      case 'PLAYER_TURN':
        {
          const pendingNarrationSequence = context.getGameState().pendingNarrationSequence;
          if (pendingNarrationSequence) {
            NarrationService.continuePendingNarrationSequence(pendingNarrationSequence, context);
          }
        }
        break;
    }
  };
}
