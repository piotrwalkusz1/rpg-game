import { typeName } from 'utils';
import type { GameEngine } from '../game';
import type { Script } from './script';
import type { ScriptStep } from './script-step';
import type { ScriptStepExecutor } from './script-step-executor';

export class ScriptService {
  constructor(private scriptStepExecutors: ScriptStepExecutor<ScriptStep>[]) {}

  async excecuteScript(script: Script, engine: GameEngine): Promise<void> {
    for (const step of script.steps) {
      await this.executeScriptStep(step, engine);
    }
  }

  private async executeScriptStep(scriptStep: ScriptStep, engine: GameEngine): Promise<void> {
    const scriptStepExecutor = this.scriptStepExecutors.filter((executor) => scriptStep instanceof executor.scriptStepType)[0];
    if (!scriptStepExecutor) {
      throw new Error('ScriptStepExecutor for type ' + typeName(scriptStep) + ' not found');
    }
    await scriptStepExecutor.execute(scriptStep, engine);
  }
}
