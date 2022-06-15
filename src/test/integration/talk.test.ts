import { CDIContainer } from 'cdi-container';
import type { GameEngine } from 'engine/core/game';
import { Character } from 'engine/modules/character';
import { CharacterJournalEntry } from 'engine/modules/journal-extensions/journal-character';
import { OfferService } from 'engine/modules/offer';
import { TalkActivity } from 'engine/modules/talk';
import { TalkService } from 'engine/modules/talk/talk-service';
import { Talker } from 'engine/modules/talk/talker';
import { DialogBookmark } from 'frontend/bookmark';
import { GameService } from 'frontend/game';
import type { GameStore } from 'frontend/store/game-store';
import { GameStoreService } from 'frontend/store/game-store-service';
import { GameBuilder, getPlayer, Player } from 'game';
import { get } from 'svelte/store';

describe('Talk', () => {
  let cdiContainer: CDIContainer;
  let engine: GameEngine;
  let store: GameStore;
  let player: Player;

  beforeEach(() => {
    cdiContainer = CDIContainer.default();
    engine = cdiContainer.get(GameBuilder).build();
    store = cdiContainer.get(GameStoreService).createStore({ engine });
    player = getPlayer(engine);
  });

  test('Create talk activity after talk offer is accepted', async () => {
    const talker = Talker.create(engine);
    const talker2 = Talker.create(engine);

    TalkService.offerTalk(talker, talker2, engine);
    await GameService.processEvents(engine, () => {});
    const offers = talker2.offerParty.offers;
    OfferService.makeDecision(offers[0], talker2, 'ACCEPTED', engine);
    await GameService.processEvents(engine, () => {});

    expect(talker.activityParticipant.activities.getArray()[0]).toBeInstanceOf(TalkActivity);
    expect(talker.activityParticipant.activities.getArray()[0].participants.getArray()).toEqual([
      talker.activityParticipant,
      talker2.activityParticipant
    ]);
  });

  test('Add entry to journal after end of talk', async () => {
    const character = Character.create(engine);

    TalkService.offerTalk(player.talker, character.talker, engine);
    await GameService.processEvents(engine, () => {});
    const offers = character.offerParty.offers;
    OfferService.makeDecision(offers[0], character, 'ACCEPTED', engine);
    await GameService.processEvents(engine, () => {});
    await GameService.processEvents(engine, () => {});

    expect(getPlayer(engine).journal.entries).toEqual([
      new CharacterJournalEntry({ character, text: 'JOURNAL.ENTRY.TALK_END', time: engine.time })
    ]);
  });

  test('Display dialog bookmark after end of talk', async () => {
    const character = Character.create(engine);

    TalkService.offerTalk(player.talker, character.talker, engine);
    await GameService.processEvents(engine, () => {});
    const offers = character.offerParty.offers;
    OfferService.makeDecision(offers[0], character, 'ACCEPTED', engine);
    await GameService.processEvents(engine, () => {});
    await GameService.processEvents(engine, () => {});

    const bookmarks = get(store.bookmarks);

    expect(bookmarks).toEqual([
      new DialogBookmark({
        character,
        journalEntries: [new CharacterJournalEntry({ character, text: 'JOURNAL.ENTRY.TALK_END', time: engine.time })]
      })
    ]);
  });
});
