import { ArrayUtils } from '../../../../../utils/array-utils';
import { CharacterAction, CharacterActionResultEvent, CharacterActionScheduledEvent } from '../../../../core/action/model/character-action';
import type { Character } from '../../../../core/character/model/character';
import type { GameContext } from '../../../../core/game/model/game-context';
import type { Position } from '../../../../core/map/model/position';
import { TerrainObjectPosition } from '../../../../core/map/model/position';
import { PositionSet } from '../../../../core/map/model/position-set';

export class GoActionScheduledEvent extends CharacterActionScheduledEvent {
  readonly newPosition: Position;
  readonly oldPosition: Position;

  constructor({ character, newPosition, oldPosition }: { character: Character; newPosition: Position; oldPosition: Position }) {
    super({
      character,
      visibilityPositions: PositionSet.create({
        subSets: ArrayUtils.filterInstanceOf([newPosition, oldPosition], TerrainObjectPosition).flatMap((position) =>
          PositionSet.create({ terrainObject: position.terrainObject, placement: position.placement })
        )
      })
    });
    this.newPosition = newPosition;
    this.oldPosition = oldPosition;
  }

  override get detectablePositions(): Position[] {
    return [this.newPosition, this.oldPosition];
  }
}

export class GoActionResultEvent extends CharacterActionResultEvent {
  readonly newPosition: Position;
  readonly oldPosition: Position;

  constructor({ character, newPosition, oldPosition }: { character: Character; newPosition: Position; oldPosition: Position }) {
    super({
      character,
      visibilityPositions: PositionSet.create({
        subSets: ArrayUtils.filterInstanceOf([newPosition, oldPosition], TerrainObjectPosition).flatMap((position) =>
          PositionSet.create({ terrainObject: position.terrainObject, placement: position.placement })
        )
      })
    });
    this.newPosition = newPosition;
    this.oldPosition = oldPosition;
  }

  override get detectablePositions(): Position[] {
    return [this.newPosition, this.oldPosition];
  }
}

export class GoAction extends CharacterAction {
  readonly position: Position;

  constructor({ character, position }: { character: Character; position: Position }) {
    super({ character });
    this.position = position;
  }

  get duration(): Duration {
    return {
      minutes: 1
    };
  }

  override canExecute(): boolean {
    return this.character.healthPoints > 0;
  }

  override async execute(context: GameContext): Promise<GoActionResultEvent | undefined> {
    const oldPosition = this.character.position;
    if (oldPosition === undefined) {
      return;
    }
    context.changeCharacterPosition(this.character, this.position);
    return new GoActionResultEvent({ character: this.character, newPosition: this.position, oldPosition });
  }

  override getActionScheduledEvent(_context: GameContext): CharacterActionScheduledEvent | undefined {
    const oldPosition = this.character.position;
    if (oldPosition === undefined) {
      return;
    }
    return new GoActionScheduledEvent({ character: this.character, newPosition: this.position, oldPosition });
  }
}
