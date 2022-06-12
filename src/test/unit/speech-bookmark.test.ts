import { GameEngine } from 'engine/core/game';
import { Character } from 'engine/modules/character';
import { SpeechBookmark } from 'frontend/bookmark/bookmarks/speech-bookmark';
import { Dialog } from 'frontend/dialog';

describe('SpeechBookmark', () => {
  let engine: GameEngine;
  let speechBookmark: SpeechBookmark;

  beforeEach(() => {
    engine = new GameEngine();
    speechBookmark = new SpeechBookmark({ dialog: new Dialog({ character: Character.create(engine), speeches: [] }) });
  });

  describe('background', () => {
    it('should return "ELLOW color', () => {
      expect(speechBookmark.background).toEqual('YELLOW');
    });
  });

  describe('image', () => {
    it('should return image', () => {
      expect(speechBookmark.image).toEqual('/images/ui/speech-bubble.png');
    });
  });

  describe('onClick', () => {
    it('should show dialog if dialog is not displayed', () => {
      let displayedDialog: Dialog | undefined = undefined;

      expect(
        speechBookmark.onClick({ getDisplayedDialog: () => displayedDialog, setDisplayedDialog: (dialog) => (displayedDialog = dialog) })
      );

      expect(displayedDialog).toBe(speechBookmark.dialog);
    });

    it('should hide dialog if dialog is already displayed', () => {
      let displayedDialog: Dialog | undefined = speechBookmark.dialog;

      expect(
        speechBookmark.onClick({ getDisplayedDialog: () => displayedDialog, setDisplayedDialog: (dialog) => (displayedDialog = dialog) })
      );

      expect(displayedDialog).toBeUndefined();
    });
  });
});
