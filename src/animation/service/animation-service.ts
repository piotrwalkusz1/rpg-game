import { CustomWaitingAnimation } from '../model/animations/custom-waiting-animation';
import type { BasicAnimation } from '../model/basic-animation';
import type { GameContext } from '../../game/model/game-context';

export namespace AnimationService {
  export const play = async (animation: BasicAnimation, context: GameContext): Promise<void> => {
    context.blockedScreen = true;
    await animation.play();
    context.blockedScreen = false;
  };

  export const wait = async (duration: Duration, context: GameContext): Promise<void> => {
    const waitingAnimation = new CustomWaitingAnimation({ duration });
    await play(waitingAnimation, context);
  };
}
