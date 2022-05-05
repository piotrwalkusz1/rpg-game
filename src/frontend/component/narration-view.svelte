<script lang="ts">
  import { narration, selectedField } from 'frontend/store';
  import AvatarWithName from './avatar-with-name.svelte';
  import NarrationOptionView from './narration-option-view.svelte';
</script>

{#if $selectedField}
  <AvatarWithName avatar={$selectedField.image} name={$selectedField.name} description={$selectedField.description} />
  {#if $narration}
    {#each $narration.options as narrationOption}
      <div class="mt-[5px]">
        <NarrationOptionView {narrationOption} />
      </div>
    {/each}
  {/if}
{/if}
