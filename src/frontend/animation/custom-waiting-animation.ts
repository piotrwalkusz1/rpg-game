import { WaitingAnimation } from 'frontend/animation';

export class CustomWaitingAnimation extends WaitingAnimation {
  private readonly _onStart?: () => Promise<void>;
  private readonly _onEnd?: () => Promise<void>;
  private readonly _duration: Duration;

  constructor({ onStart, onEnd, duration }: { onStart?: () => Promise<void>; onEnd?: () => Promise<void>; duration: Duration }) {
    super();
    this._onStart = onStart;
    this._onEnd = onEnd;
    this._duration = duration;
  }

  protected override get duration(): Duration {
    return this._duration;
  }

  protected override async onStart(): Promise<void> {
    await this._onStart?.();
  }

  protected override async onEnd(): Promise<void> {
    await this._onEnd?.();
  }
}
