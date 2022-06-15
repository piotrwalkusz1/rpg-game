import { BookmarkService, DialogBookmarkProvider } from 'frontend/bookmark';
import { GameStoreService } from 'frontend/store/game-store-service';

export class CDIContainer {
  readonly gameStoreService: GameStoreService;

  private constructor() {
    const bookmarkProviders = [new DialogBookmarkProvider()];
    const bookmarkService = new BookmarkService(bookmarkProviders);
    this.gameStoreService = new GameStoreService(bookmarkService);
  }

  static create(): CDIContainer {
    return new CDIContainer();
  }
}
