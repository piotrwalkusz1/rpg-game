import type { Image } from 'engine/core/resources';
import type { Dialog } from 'frontend/dialog';

export type BookmarkBackground = 'YELLOW' | 'RED';

export type BookmarkOnClickParams = {
  getDisplayedDialog: () => Dialog | undefined;
  setDisplayedDialog: (dialog: Dialog | undefined) => void;
};

export abstract class Bookmark {
  abstract get background(): BookmarkBackground;

  abstract get image(): Image;

  abstract onClick(params: BookmarkOnClickParams): void;
}
