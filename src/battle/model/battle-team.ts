import type { BattleParticipant } from './battle-participant';

export class BattleTeam {
    readonly participants: BattleParticipant[];
    
    constructor ({participants}: {participants : BattleParticipant[]}) {
        this.participants = participants;
    }
}