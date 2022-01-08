import { Battle } from '../../../battle/model/battle';
import { BattleParticipant } from '../../../battle/model/battle-participant';
import { BattleTeam } from '../../../battle/model/battle-team';
import type { Character } from '../../../character/model/character';
import type { Position } from '../../../map/model/position';
import type { ActionExecutionContext } from '../action-execution-context';
import { Action, ActionResultEvent, ActionScheduledEvent } from './action';

export class AttackActionScheduledEvent extends ActionScheduledEvent {
  readonly position: Position;

  constructor({ position }: { position: Position }) {
    super({ visibilityPositions: [] });
    this.position = position;
  }

  override get detectablePositions(): Position[] {
    return [this.position];
  }
}

export class AttackActionResultEvent extends ActionResultEvent {
  readonly position: Position;

  constructor({ position }: { position: Position }) {
    super({ visibilityPositions: [] });
    this.position = position;
  }

  override get detectablePositions(): Position[] {
    return [this.position];
  }
}

export class AttackAction extends Action {
  readonly attacker: Character;
  readonly victim: Character;
  readonly position: Position;

  constructor({ attacker, victim }: { attacker: Character; victim: Character }) {
    super();
    if (!victim.position) {
      throw new Error('Attacked victim must have position');
    }
    this.attacker = attacker;
    this.victim = victim;
    this.position = victim.position;
  }

  execute(actionExecutionContext: ActionExecutionContext): AttackActionResultEvent {
    actionExecutionContext.startBattle(
      new Battle({
        firstTeam: new BattleTeam({ participants: [new BattleParticipant({ character: this.attacker })] }),
        secondTeam: new BattleTeam({ participants: [new BattleParticipant({ character: this.victim })] })
      })
    );
    return new AttackActionResultEvent({ position: this.position });
  }

  getActionScheduledEvent(): ActionScheduledEvent | undefined {
    return new AttackActionScheduledEvent({ position: this.position });
  }
}
