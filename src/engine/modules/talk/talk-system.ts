import type { ECSEvent } from 'engine/core/ecs';
import { GameEngine, GameSystem } from 'engine/core/game';
import { ArrayUtils } from 'utils';
import { OfferAcceptedEvent } from '../offer';
import { TalkOfferClause } from './talk-offer-clause';
import type { TalkService } from './talk-service';

export class TalkSystem extends GameSystem {
  constructor(private talkService: TalkService) {
    super();
  }

  override async processEvent(event: ECSEvent, engine: GameEngine): Promise<void> {
    if (event instanceof OfferAcceptedEvent) {
      ArrayUtils.filterInstanceOf(event.offer.clauses, TalkOfferClause).forEach((clause) => {
        this.talkService.startTalk(clause.talkers, engine);
      });
    }
  }
}
