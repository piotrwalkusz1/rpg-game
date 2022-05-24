<script lang="ts">
  import { faAngleDown, faTimes } from '@fortawesome/free-solid-svg-icons';
  import type { Dialog } from 'frontend/dialog';
  import { displayedDialog } from 'frontend/store';
  import TranslatableTextView from 'i18n/translatable-text-view.svelte';
  import Fa from 'svelte-fa';
  import AvatarWithName from './avatar-with-name.svelte';
  import Border from './borders/border.svelte';

  export let dialog: Dialog;

  function hideDialog() {
    displayedDialog.set(undefined);
  }

  function closeDialog() {
    if (dialog.onClose) {
      dialog.onClose();
    }
    hideDialog();
  }
</script>

<div
  class="flex fixed bg-[url('/images/background.jpg')] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[740px] h-[400px] z-dialog shadow-[5px_5px_5px_0_rgba(0,0,0,0.4)]"
>
  <Border class="w-full h-full">
    <div class="p-border">
      <div class="flex m-5px">
        <AvatarWithName avatar={dialog.character.avatar} name={dialog.character.name} />
        <div class="flex self-start items-center ml-auto pr-[5px] text-[#c79b00]">
          <span on:click={hideDialog}>
            <Fa icon={faAngleDown} class="text-[25px] hover:text-[#614c00] cursor-pointer" />
          </span>

          {#if dialog.onClose}
            <span on:click={closeDialog}>
              <Fa icon={faTimes} class="ml-[15px] text-[20px] hover:text-[#614c00] cursor-pointer" />
            </span>
          {/if}
        </div>
      </div>
      <div>
        {#each dialog.speeches as speech}
          <div class="font-default text-[20px] mx-[12px] my-[15px]">
            <TranslatableTextView text={speech.content} />
          </div>
        {/each}
      </div>
    </div>
  </Border>
</div>
