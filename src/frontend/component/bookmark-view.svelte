<script lang="ts">
  import type { Image } from 'engine/core/resources';
  import type { Bookmark } from 'frontend/bookmark';
  import { displayedDialog } from 'frontend/store';
  import { get } from 'svelte/store';

  export let bookmark: Bookmark;

  $: bookmarkImageStyle = getBookmarkImageStyle(bookmark.image);

  function getBookmarkImageStyle(image: Image): string {
    if (image === '/images/ui/speech-bubble.png') {
      return 'width: 40px; height: 34px; transform: translateX(-50%) translateY(calc(-50% + 1px)); ';
    }
    return '';
  }
</script>

<div
  class="bookmark shadow-[5px_3px_5px_1px_rgba(67,67,67,0.27)] hover:shadow-[5px_3px_6px_2px_rgba(0,0,0,0.4)]"
  on:click={() => bookmark.onClick({ setDisplayedDialog: displayedDialog.set, getDisplayedDialog: () => get(displayedDialog) })}
>
  <div
    style="background-image: url({bookmark.image}); {bookmarkImageStyle}"
    class="absolute top-[50%] left-[50%] bg-contain bg-center bg-no-repeat"
  />
</div>

<style>
  .bookmark {
    width: 58px;
    height: 58px;
    position: relative;
    box-sizing: border-box;
    background: conic-gradient(
      from 180deg at 50% 50%,
      #e1e445 -45deg,
      #fdffad 0deg,
      #e1e445 45deg,
      #fdffad 90deg,
      #e1e445 135deg,
      #fdffad 180deg,
      #e1e445 225deg,
      #fdffad 270deg,
      #e1e445 315deg,
      #fdffad 360deg
    );
    background-clip: padding-box;
    border: solid 3px transparent;
    border-radius: 50%;
  }

  .bookmark:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -3px;
    border-radius: inherit;
    background: conic-gradient(
      from 180deg at 50% 50%,
      #e2e544 -46.87deg,
      #c8ca61 0.81deg,
      #e2e544 42.5deg,
      #c8ca61 89.93deg,
      #e2e544 132.56deg,
      #c8ca61 179.62deg,
      #e2e644 227.51deg,
      #cbcd4b 270.07deg,
      #e2e544 313.12deg,
      #c8ca61 360.81deg
    );
  }
</style>
