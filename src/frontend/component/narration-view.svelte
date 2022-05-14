<script lang="ts">
  import { narration } from 'frontend/store';
  import AvatarWithName from './avatar-with-name.svelte';
  import NarrationOptionView from './narration-option-view.svelte';
</script>

{#if $narration}
  <AvatarWithName avatar={$narration.image} name={$narration.title} description={$narration.description} />
  {#each $narration.options as narrationOption}
    <div class="mt-[5px]">
      <NarrationOptionView {narrationOption} />
    </div>
  {/each}
{/if}
