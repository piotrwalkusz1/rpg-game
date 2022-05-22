import { ActionExecutingEvent } from 'engine/core/action';
import { ECSEvent, Engine, System } from 'engine/core/ecs';
import { ArrayUtils } from 'utils';
import { Character } from '../character';
import { JournalOwner } from '../journal/journal-owner';
import { SpeakAction } from '../speaking';
import { SpeakJournalEntry } from './speak-journal-entry';

export class JournalSpeakingSystem extends System {
  override async processEvent(event: ECSEvent, _engine: Engine): Promise<void> {
    if (event instanceof ActionExecutingEvent && event.action instanceof SpeakAction) {
      this.handleSpeakActionExecutingEvent(event.action, event);
    }
  }

  private handleSpeakActionExecutingEvent({ receivers, content, quote }: SpeakAction, { time, executor }: ActionExecutingEvent) {
    const speaker = executor.getComponent(Character);
    if (!speaker) {
      return;
    }
    ArrayUtils.mapAndFilterNotNull(receivers, (receiver) => receiver.getComponent(JournalOwner)?.journal).forEach((journal) =>
      journal.addEntry(new SpeakJournalEntry({ time, speaker, content, quote }))
    );
  }
}
