import type { GameEngine } from 'engine/core/game';
import { ScriptStep, ScriptStepExecutor } from 'engine/core/script';
import type { Type } from 'utils';
import { InteractionScriptStep } from './interaction-script-step';
import type { InteractionService } from './interaction-service';

export class InteractionScriptStepExecutor extends ScriptStepExecutor<InteractionScriptStep> {
  constructor(private interactionService: InteractionService) {
    super();
  }

  override get scriptStepType(): Type<ScriptStep> {
    return InteractionScriptStep;
  }

  override async execute({ executor, interaction }: InteractionScriptStep, engine: GameEngine): Promise<void> {
    await this.interactionService.executeInteraction(executor, interaction, engine);
  }
}
