import type { ScriptService } from 'engine/core/script';
import { GameService } from 'frontend/game';
import type { GameStore } from 'frontend/store/game-store';
import type { Type } from 'utils';
import { NarrationOptionExecutor } from '../narration-option-executor';
import { ScriptNarrationOption } from '../narration-options';

export class ScriptNarrationOptionExecutor extends NarrationOptionExecutor<ScriptNarrationOption> {
  constructor(private scriptService: ScriptService) {
    super();
  }

  override get narrationOptionType(): Type<ScriptNarrationOption> {
    return ScriptNarrationOption;
  }

  override async execute({ script }: ScriptNarrationOption, store: GameStore): Promise<void> {
    await this.scriptService.excecuteScript(script, store.getEngine());
    await GameService.processEvents(store);
  }
}
