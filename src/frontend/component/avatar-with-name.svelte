<script lang="ts">
  import Avatar from 'frontend/component/avatar.svelte';
  import DisplayedName from 'frontend/component/displayed-name.svelte';
  import type { TranslatableText } from 'i18n/translatable-text';
  import TranslatableTextView from 'i18n/translatable-text-view.svelte';

  export let avatar: string | undefined;
  export let name: TranslatableText;
  export let description: TranslatableText | undefined = undefined;
</script>

<div class="flex">
  <Avatar image={avatar} />
  <div class="flex-col pl-[6px]">
    <div class="mt-[-4px]">
      <DisplayedName value={name} />
    </div>
    {#if description}
      <div class="font-default text-[15px] mt-[-6px]">
        <TranslatableTextView text={description} />
      </div>
    {/if}
  </div>
</div>
