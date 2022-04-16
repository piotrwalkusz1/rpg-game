import { AnimationService } from '../../../../../frontend/animation/service/animation-service';
import { CharacterAction, CharacterActionResultEvent, CharacterActionScheduledEvent } from '../../../../core/action/model/character-action';
import { AIService } from '../../../../core/ai/service/ai-service';
import type { Actor } from '../../../../core/actor/model/actor';
import type { GameContext } from '../../../../core/game/model/game-context';
import { Position, TerrainObjectPosition } from '../../../../core/map/model/position';
import { PositionSet } from '../../../../core/map/model/position-set';
import { BattleService } from '../../service/battle-service';
import { BattleNarration } from '../battle-narration';

export class AttackActionScheduledEvent extends CharacterActionScheduledEvent {
  readonly position: Position;

  constructor({ position, character }: { position: Position; character: Actor }) {
    super({ visibilityPositions: PositionSet.create(), character });
    this.position = position;
  }

  override get detectablePositions(): Position[] {
    return [this.position];
  }
}

export class AttackActionResultEvent extends CharacterActionResultEvent {
  readonly position: Position;

  constructor({ position, character }: { position: Position; character: Actor }) {
    super({ visibilityPositions: PositionSet.create(), character });
    this.position = position;
  }

  override get detectablePositions(): Position[] {
    return [this.position];
  }
}

export class AttackAction extends CharacterAction {
  readonly target: Actor;
  readonly position: Position;

  constructor({ character, target }: { character: Actor; target: Actor }) {
    super({ character });
    if (!target.position) {
      throw new Error('Attacked victim must have position');
    }
    this.target = target;
    this.position = target.position;
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

  override async execute(context: GameContext): Promise<AttackActionResultEvent> {
    const battleActivity = BattleService.setCommonBattleActivity([this.character, this.target]);
    const shouldDisplayAnimation = this.character === context.player || this.target === context.player;
    if (shouldDisplayAnimation) {
      context.battle = new BattleNarration({ battleActivity, currentParticipant: this.character });
      await AnimationService.wait({ seconds: 1 }, context);
    }
    context.dealDamage(this.target, this.character.damage);
    if (shouldDisplayAnimation) {
      await AnimationService.wait({ seconds: 1 }, context);
    }
    if (this.target !== context.player) {
      AIService.executeTurn(this.target, context);
    }
    return new AttackActionResultEvent({ position: this.position, character: this.character });
  }

  override getActionScheduledEvent(): CharacterActionScheduledEvent | undefined {
    return new AttackActionScheduledEvent({ position: this.position, character: this.character });
  }
}
