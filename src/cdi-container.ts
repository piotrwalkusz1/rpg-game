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

  private constructor() {
    this.singleton(DialogBookmarkProvider, () => new DialogBookmarkProvider());
    this.singleton(BookmarkService, (cdi) => new BookmarkService(cdi.getAll(BookmarkProvider)));
    this.singleton(GameStoreService, (cdi) => new GameStoreService(cdi.get(BookmarkService)));
    this.singleton(ActionSystem, () => new ActionSystem());
    this.singleton(CommandSystem, () => new CommandSystem());
    this.singleton(MovementSystem, () => new MovementSystem());
    this.singleton(JournalSpeakingSystem, () => new JournalSpeakingSystem());
    this.singleton(TalkJournalSystem, () => new TalkJournalSystem());
    this.singleton(TalkSystem, () => new TalkSystem());
    this.singleton(OfferSystem, () => new OfferSystem());
    this.singleton(AISystem, () => new AISystem());
    this.dependent(GameBuilder, (cdi) => new GameBuilder(cdi.getAll(GameSystem)));
  }

  static create(): CDIContainer {
    return new CDIContainer();
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