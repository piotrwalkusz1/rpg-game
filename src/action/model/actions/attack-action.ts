import type { Character } from '../../../character/model/character';
import type { WorldContext } from '../../../game/model/world-context';
import type { Position } from '../../../map/model/position';
import { PositionSet } from '../../../map/model/position-set';
import { CharacterAction, CharacterActionResultEvent, CharacterActionScheduledEvent } from '../character-action';

export class AttackActionScheduledEvent extends CharacterActionScheduledEvent {
  readonly position: Position;

  constructor({ position, character }: { position: Position; character: Character }) {
    super({ visibilityPositions: PositionSet.create(), character });
    this.position = position;
  }

  override get detectablePositions(): Position[] {
    return [this.position];
  }
}

export class AttackActionResultEvent extends CharacterActionResultEvent {
  readonly position: Position;

  constructor({ position, character }: { position: Position; character: Character }) {
    super({ visibilityPositions: PositionSet.create(), character });
    this.position = position;
  }

  override get detectablePositions(): Position[] {
    return [this.position];
  }
}

export class AttackAction extends CharacterAction {
  readonly target: Character;
  readonly position: Position;

  constructor({ character, target }: { character: Character; target: Character }) {
    super({ character });
    if (!target.position) {
      throw new Error('Attacked victim must have position');
    }
    this.target = target;
    this.position = target.position;
  }

  override get waitingAfterAction(): Duration {
    return {};
  }

  override get duration(): Duration {
    return { seconds: 2 };
  }

  override execute(context: WorldContext): AttackActionResultEvent {
    context.dealDamage(this.target, this.character.damage);
    return new AttackActionResultEvent({ position: this.position, character: this.character });
  }

  override getActionScheduledEvent(): CharacterActionScheduledEvent | undefined {
    return new AttackActionScheduledEvent({ position: this.position, character: this.character });
  }
}
