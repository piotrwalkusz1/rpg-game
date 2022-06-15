import { BookmarkProvider, BookmarkService, DialogBookmarkProvider } from 'frontend/bookmark';
import { GameStoreService } from 'frontend/store/game-store-service';
import { isAssignableTo, Type } from 'utils';

class Instance<T> {
  private value: T | undefined = undefined;

  constructor(public type: Type<T>, private compute: () => T) {}

  get(): T {
    if (!this.value) {
      this.value = this.compute();
    }
    return this.value;
  }
}

export class CDIContainer {
  private _instances: Instance<unknown>[] = [];

  private constructor() {
    this.bind(DialogBookmarkProvider, () => new DialogBookmarkProvider());
    this.bind(BookmarkService, (cdi) => new BookmarkService(cdi.getAll(BookmarkProvider)));
    this.bind(GameStoreService, (cdi) => new GameStoreService(cdi.get(BookmarkService)));
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

  bind<T>(type: Type<T>, instanceProvider: (cdi: CDIContainer) => T): void {
    this._instances.push(new Instance(type, () => instanceProvider(this)));
  }
}
