import type { BattleTeam } from './battle-team';

export class Battle {
    readonly firstTeam: BattleTeam;
    readonly secondTeam: BattleTeam;

    constructor({firstTeam, secondTeam}: {firstTeam: BattleTeam, secondTeam: BattleTeam}) {
        this.firstTeam = firstTeam;
        this.secondTeam = secondTeam;
    }
}