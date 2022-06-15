import type { ECSEvent, Engine } from 'engine/core/ecs';
import { GameSystem } from 'engine/core/game';
import { InteractionEvent } from 'engine/modules/interaction';
import { ArrayUtils } from 'utils';
import { Character } from '../../character';
import { JournalOwner } from '../../journal/journal-owner';
import { SpeakInteraction } from '../../speaking';
import { SpeakJournalEntry } from './speak-journal-entry';

export class JournalSpeakingSystem extends GameSystem {
  override async processEvent(event: ECSEvent, _engine: Engine): Promise<void> {
    if (event instanceof InteractionEvent && event.interaction instanceof SpeakInteraction) {
      this.handleSpeakActionExecutingEvent(event.interaction, event);
    }
  }

  private handleSpeakActionExecutingEvent({ receivers, content, quote }: SpeakInteraction, { time, executor }: InteractionEvent) {
    const speaker = executor.getComponent(Character);
    if (!speaker) {
      return;
    }
    ArrayUtils.mapAndFilterNotNull(receivers, (receiver) => receiver.getComponent(JournalOwner)?.journal).forEach((journal) =>
      journal.addEntry(new SpeakJournalEntry({ time, speaker, content, quote }))
    );
  }
}
