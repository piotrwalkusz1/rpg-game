import { ActionSystem } from 'engine/core/action';
import { AISystem } from 'engine/core/ai';
import { CommandSystem } from 'engine/core/command';
import { GameSystem } from 'engine/core/game';
import { JournalSpeakingSystem } from 'engine/modules/journal-extensions/journal-speaking';
import { TalkJournalSystem } from 'engine/modules/journal-extensions/journal-talk';
import { MovementSystem } from 'engine/modules/movement';
import { OfferSystem } from 'engine/modules/offer';
import { TalkSystem } from 'engine/modules/talk';
import { BookmarkProvider, BookmarkService, DialogBookmarkProvider } from 'frontend/bookmark';
import {
  CharacterNarrationProvider,
  MovementNarrationProvider,
  NarrationProvider,
  NarrationService,
  TalkNarrationProvider
} from 'frontend/narration';
import { GameStoreService } from 'frontend/store/game-store-service';
import { GameBuilder } from 'game';
import { isAssignableTo, Type } from 'utils';

class Instance<T> {
  private value: T | undefined = undefined;

  constructor(public type: Type<T>, private compute: () => T, private singleton: boolean) {}

  get(): T {
    if (!this.singleton) {
      return this.compute();
    }
    if (!this.value) {
      this.value = this.compute();
    }
    return this.value;
  }
}

export class CDIContainer {
  private _instances: Instance<unknown>[] = [];

  static default(): CDIContainer {
    const container = new CDIContainer();
    container.singleton(DialogBookmarkProvider, () => new DialogBookmarkProvider());
    container.singleton(BookmarkService, (cdi) => new BookmarkService(cdi.getAll(BookmarkProvider)));
    container.singleton(TalkNarrationProvider, () => new TalkNarrationProvider());
    container.singleton(MovementNarrationProvider, () => new MovementNarrationProvider());
    container.singleton(CharacterNarrationProvider, () => new CharacterNarrationProvider());
    container.singleton(NarrationService, (cdi) => new NarrationService(cdi.getAll(NarrationProvider)));
    container.singleton(GameStoreService, (cdi) => new GameStoreService(cdi.get(BookmarkService), cdi.get(NarrationService)));
    container.singleton(ActionSystem, () => new ActionSystem());
    container.singleton(CommandSystem, () => new CommandSystem());
    container.singleton(MovementSystem, () => new MovementSystem());
    container.singleton(JournalSpeakingSystem, () => new JournalSpeakingSystem());
    container.singleton(TalkJournalSystem, () => new TalkJournalSystem());
    container.singleton(TalkSystem, () => new TalkSystem());
    container.singleton(OfferSystem, () => new OfferSystem());
    container.singleton(AISystem, () => new AISystem());
    container.dependent(GameBuilder, (cdi) => new GameBuilder(cdi.getAll(GameSystem)));
    return container;
  }

  get<T>(type: Type<T>): T {
    const instances = this.getAll(type);
    if (instances.length === 1) {
      return instances[0];
    }
    throw new Error('Expected 1 instance but was ' + instances.length);
  }

  getAll<T>(type: Type<T>): T[] {
    return this._instances.filter((instance) => isAssignableTo(instance.type, type)).map((instance) => instance.get() as T);
  }

  singleton<T>(type: Type<T>, instanceProvider: (cdi: CDIContainer) => T): void {
    this._instances.push(new Instance(type, () => instanceProvider(this), true));
  }

  dependent<T>(type: Type<T>, instanceProvider: (cdi: CDIContainer) => T): void {
    this._instances.push(new Instance(type, () => instanceProvider(this), false));
  }
}
