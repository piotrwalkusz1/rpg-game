<script lang="ts">
  import Avatar from 'frontend/component/avatar.svelte';
  import DisplayedName from 'frontend/component/displayed-name.svelte';
  import type { TranslatableText } from 'i18n/translatable-text';

  export let avatar: string | string;
  export let name: TranslatableText;
</script>

<div class="flex">
  <Avatar image={avatar} />
  <div class="pl-[6px]">
    <DisplayedName value={name} />
  </div>
</div>
