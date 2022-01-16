import type { WorldContext } from '../../game/model/world-context';

export namespace TimeService {
  export const handleNextTimeEvent = (context: WorldContext): void => {
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
        break;
    }
  };
}
