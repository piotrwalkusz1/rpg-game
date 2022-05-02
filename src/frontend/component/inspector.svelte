<script lang="ts">
  import { selectedField } from 'frontend/store';
  import AvatarWithName from './avatar-with-name.svelte';
</script>

{#if $selectedField}
  <AvatarWithName avatar={$selectedField.imageUrl} name={$selectedField.name} description={$selectedField.description} />
{/if}
