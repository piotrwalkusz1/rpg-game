<script lang="ts">
  import type { Dialog } from 'frontend/dialog';
  import TranslatableTextView from 'i18n/translatable-text-view.svelte';
  import AvatarWithName from './avatar-with-name.svelte';
  import Border from './borders/border.svelte';

  export let dialog: Dialog;
</script>

<div
  class="flex fixed bg-[url('/images/background.jpg')] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[740px] h-[400px] z-dialog"
>
  <Border class="w-full h-full">
    <div class="p-border">
      <div class="m-5px">
        <AvatarWithName avatar={dialog.character.avatar} name={dialog.character.name} />
      </div>
      <div>
        {#each dialog.speeches as speech}
          <div>
            <TranslatableTextView text={speech.content} />
          </div>
        {/each}
      </div>
    </div>
  </Border>
</div>
