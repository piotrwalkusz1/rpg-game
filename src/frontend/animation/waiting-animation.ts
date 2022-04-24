import { BasicAnimation } from 'frontend/animation';
import { ThreadUtils } from 'utils';

export abstract class WaitingAnimation extends BasicAnimation {
  override async play(): Promise<void> {
    await this.onStart();
    await ThreadUtils.sleep(this.duration);
    await this.onEnd();
  }

  protected abstract get duration(): Duration;

  protected async onStart(): Promise<void> {
    // Do nothing by default
  }

  protected async onEnd(): Promise<void> {
    // Do nothing by default
  }
}
