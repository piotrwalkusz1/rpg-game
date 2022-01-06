import type { Character } from '../../character/model/character';

export interface BattleActionExecutionContext {
  dealDamage: (target: Character, damage: number) => void;
}
