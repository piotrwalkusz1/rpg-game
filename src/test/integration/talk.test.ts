import { CDIContainer } from 'cdi-container';
import { rootField, subFieldAt } from 'engine/core/field';
import type { GameEngine } from 'engine/core/game';
import { Character } from 'engine/modules/character';
import { OfferService } from 'engine/modules/offer';
import { TalkActivity } from 'engine/modules/talk';
import { TalkService } from 'engine/modules/talk/talk-service';
import { Talker } from 'engine/modules/talk/talker';
import { GameService } from 'frontend/game';
import { CharacterNarrationContext, NarrationService, TalkNarrationOption } from 'frontend/narration';
import type { GameStore } from 'frontend/store/game-store';
import { GameStoreService } from 'frontend/store/game-store-service';
import { GameBuilder } from 'game';
import { get } from 'svelte/store';

describe('Talk', () => {
  let cdiContainer: CDIContainer;
  let talkService: TalkService;
  let offerService: OfferService;
  let narrationService: NarrationService;
  let engine: GameEngine;
  let store: GameStore;

  beforeEach(() => {
    cdiContainer = CDIContainer.default();
    talkService = cdiContainer.get(TalkService);
    offerService = cdiContainer.get(OfferService);
    narrationService = cdiContainer.get(NarrationService);
    engine = cdiContainer.get(GameBuilder).build();
    store = cdiContainer.get(GameStoreService).createStore({ engine });
  });

  test('Create talk activity after talk offer is accepted', async () => {
    const talker = Talker.create(engine);
    talker.fieldObject.field = subFieldAt(rootField(engine), [0, 0]);
    const talker2 = Talker.create(engine);
    talker2.fieldObject.field = subFieldAt(rootField(engine), [0, 0]);

    talkService.offerTalk(talker, talker2, engine);
    await GameService.processEvents(store);
    const offers = talker2.offerParty.offers;
    offerService.makeDecision(offers[0], talker2.offerParty, 'ACCEPTED', engine);
    await GameService.processEvents(store);

    expect(talker.activityParticipant.activities).toEqual([
      new TalkActivity({ participants: [talker.activityParticipant, talker2.activityParticipant] })
    ]);
  });

  test('Display dialog bookmark after end of talk', async () => {
    const character = Character.create(engine, { withAI: true, field: subFieldAt(rootField(engine), [0, 0]) });

    const talkNarrationOption = narrationService
      .getNarrationOptions({ context: new CharacterNarrationContext(character), engine })
      .filter((option) => option instanceof TalkNarrationOption)[0];
    await narrationService.executeNarrationOption(talkNarrationOption, store);
    await GameService.processEvents(store);

    const bookmarks = get(store.bookmarks);

    // expect(bookmarks).toEqual([
    //   new DialogBookmark({
    //     character,
    //     journalEntries: [new CharacterJournalEntry({ character, text: 'JOURNAL.ENTRY.TALK_END', time: engine.time })]
    //   })
    // ]);

    expect(bookmarks.length).toEqual(1);
  });
});
