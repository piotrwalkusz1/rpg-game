import type { Character } from '../../../character/model/character';
import type { GameContext } from '../../../game/model/game-context';
import { Position, TerrainObjectPosition } from '../../../map/model/position';
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

  override canExecute(): boolean {
    return (
      this.character.healthPoints > 0 &&
      this.target.healthPoints > 0 &&
      this.character.position instanceof TerrainObjectPosition &&
      Position.areEqual(this.character.position, this.target.position)
    );
  }

  override execute(context: GameContext): AttackActionResultEvent {
    context.dealDamage(this.target, this.character.damage);
    return new AttackActionResultEvent({ position: this.position, character: this.character });
  }

  override getActionScheduledEvent(): CharacterActionScheduledEvent | undefined {
    return new AttackActionScheduledEvent({ position: this.position, character: this.character });
  }
}
