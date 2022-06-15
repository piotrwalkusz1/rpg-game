<script lang="ts">
  import { faAngleDown, faTimes } from '@fortawesome/free-solid-svg-icons';
  import type { DialogBookmark } from 'frontend/bookmark/bookmarks/dialog-bookmark';
  import { activatedBookmarkContext, gameStore } from 'frontend/store';
  import TranslatableTextView from 'i18n/translatable-text-view.svelte';
  import Fa from 'svelte-fa';
  import AvatarWithName from './avatar-with-name.svelte';
  import Border from './borders/border.svelte';

  export let bookmark: DialogBookmark;

  function hideDialog() {
    activatedBookmarkContext.set(undefined);
  }

  function closeDialog() {
    bookmark.journalEntries.forEach((entry) => (entry.state = 'READ'));
    gameStore.refreshEngine();
    hideDialog();
  }
</script>

<div
  class="flex fixed bg-[url('/images/background.jpg')] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[740px] h-[400px] z-dialog shadow-[5px_5px_5px_0_rgba(0,0,0,0.4)]"
>
  <Border class="w-full h-full">
    <div class="p-border">
      <div class="flex m-5px">
        <AvatarWithName avatar={bookmark.character.avatar} name={bookmark.character.name} />
        <div class="flex self-start items-center ml-auto pr-[5px] text-[#c79b00]">
          <span on:click={hideDialog}>
            <Fa icon={faAngleDown} class="text-[25px] hover:text-[#614c00] cursor-pointer" />
          </span>

          <span on:click={closeDialog}>
            <Fa icon={faTimes} class="ml-[15px] text-[20px] hover:text-[#614c00] cursor-pointer" />
          </span>
        </div>
      </div>
      <div>
        {#each bookmark.journalEntries as entry}
          <div class="font-default text-[20px] mx-[12px] my-[15px]">
            <TranslatableTextView text={entry.text} />
          </div>
        {/each}
      </div>
    </div>
  </Border>
</div>
