import type { ImageUrl } from 'engine/core/resources';
import type { Dialog } from 'frontend/dialog';
import { Bookmark, BookmarkBackground, BookmarkOnClickParams } from '../bookmark';

export class SpeechBookmark extends Bookmark {
  readonly dialog: Dialog;

  constructor({ dialog }: { dialog: Dialog }) {
    super();
    this.dialog = dialog;
  }

  override get background(): BookmarkBackground {
    return 'YELLOW';
  }

  override get image(): ImageUrl {
    return '/images/ui/speech-bubble.png';
  }

  override onClick(params: BookmarkOnClickParams): void {
    params.setDisplayedDialog(this.dialog);
  }
}
