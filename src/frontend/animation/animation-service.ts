import { BasicAnimation, CustomWaitingAnimation } from 'frontend/animation';
import { blockedScreen } from 'frontend/store';

export namespace AnimationService {
  export const play = async (animation: BasicAnimation): Promise<void> => {
    blockedScreen.set(true);
    await animation.play();
    blockedScreen.set(false);
  };

  export const wait = async (duration: Duration): Promise<void> => {
    await play(new CustomWaitingAnimation({ duration }));
  };
}
