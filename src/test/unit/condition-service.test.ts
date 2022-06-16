import { Condition, ConditionChecker, ConditionService } from 'engine/core/condition';
import { GameEngine } from 'engine/core/game';
import { Mock } from 'typemoq';

describe('ConditionService', () => {
  let conditionCheckers: ConditionChecker<Condition>[];
  let conditionService: ConditionService;
  let condition: Condition;
  let engine: GameEngine;

  beforeEach(() => {
    conditionCheckers = [];
    conditionService = new ConditionService(conditionCheckers);
    condition = Mock.ofType<Condition>().object;
    engine = new GameEngine();
  });

  describe('checkCondition', () => {
    it('should throw error if condition checker for condition not found', () => {
      expect(() => conditionService.checkCondition(condition, engine)).toThrow(new Error('ConditionChecker for type function not found'));
    });
  });
});
