import type { GameContext } from '../../game/model/game-context';
import { NarrationService } from '../../narration/service/narration-service';

export namespace TimeService {
  export const handleNextTimeEvent = (context: GameContext): void => {
    const event = context.popNextTimeEvent();
    if (!event) {
      return;
    }
    context.setCurrentTime(event.time);
    const result = event.handle(context);
    switch (result.type) {
      case 'HANDLE_NEXT_EVENT': {
        handleNextTimeEvent(context);
        break;
      }
      case 'PLAYER_TURN':
        {
          const pendingNarrationSequence = context.getGameState().player.pendingNarrationSequence;
          if (pendingNarrationSequence) {
            NarrationService.continuePendingNarrationSequence(pendingNarrationSequence, context);
          }
        }
        break;
    }
  };
}
