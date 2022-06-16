import type { TalkService } from 'engine/modules/talk/talk-service';
import { GameService } from 'frontend/game';
import type { GameStore } from 'frontend/store/game-store';
import type { Type } from 'moq.ts/lib/static.injector/type';
import { NarrationOptionExecutor } from '../narration-option-executor';
import { TalkNarrationOption } from '../narration-options';

export class TalkNarrationOptionExecutor extends NarrationOptionExecutor<TalkNarrationOption> {
  constructor(private talkService: TalkService) {
    super();
  }

  override get narrationOptionType(): Type<TalkNarrationOption> {
    return TalkNarrationOption;
  }

  override async execute(narrationOption: TalkNarrationOption, store: GameStore): Promise<void> {
    this.talkService.offerTalk(store.getPlayer().talker, narrationOption.talker, store.getEngine());
    await GameService.processEvents(store);
  }
}
