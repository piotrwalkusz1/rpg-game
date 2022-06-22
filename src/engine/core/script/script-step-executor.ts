import type { Type } from 'utils';
import type { GameEngine } from '../game';
import type { ScriptStep } from './script-step';

export abstract class ScriptStepExecutor<T extends ScriptStep> {
  abstract get scriptStepType(): Type<ScriptStep>;

  abstract execute(scriptStep: T, engine: GameEngine): Promise<void>;
}
