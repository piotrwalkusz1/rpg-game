import type { Actor } from '../../actor/model/actor';
import type { GameContext } from '../../game/model/game-context';
import type { PositionSet } from '../../map/model/position-set';
import type { NarrationDescription } from '../../narration/model/narration-description';
import { Action, ActionResultEvent, ActionScheduledEvent } from './action';

export abstract class CharacterActionScheduledEvent extends ActionScheduledEvent {
  readonly character: Actor;
  private _preventionNarrationDescription?: NarrationDescription;

  constructor({ character, visibilityPositions }: { character: Actor; visibilityPositions: PositionSet }) {
    super({ visibilityPositions });
    this.character = character;
  }

  get preventionNarrationDescription(): NarrationDescription | undefined {
    return this._preventionNarrationDescription;
  }

  prevent(preventionNarrationDescription: NarrationDescription): void {
    if (!this._preventionNarrationDescription) {
      this._preventionNarrationDescription = preventionNarrationDescription;
    }
  }
}

export abstract class CharacterActionResultEvent extends ActionResultEvent {
  readonly character: Actor;

  constructor({ character, visibilityPositions }: { character: Actor; visibilityPositions: PositionSet }) {
    super({ visibilityPositions });
    this.character = character;
  }
}

export abstract class CharacterAction extends Action {
  readonly character: Actor;

  constructor({ character }: { character: Actor }) {
    super();
    this.character = character;
  }

  abstract canExecute(context: GameContext): boolean;

  abstract execute(context: GameContext): Promise<CharacterActionResultEvent | undefined>;

  abstract getActionScheduledEvent(context: GameContext): CharacterActionScheduledEvent | undefined;
}
