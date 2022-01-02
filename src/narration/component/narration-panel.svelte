<script lang="ts">
  import TranslatableTextView from '../../i18n/translatable-text-view.svelte';
  import type { Narration } from '../model/narration';
  import type { NarrationActionExecutionContext } from '../model/narration-action-execution-context';
  import type { NarrationAction } from '../model/narration-actions/narration-action';

  export let narration: Narration;
  export let onNarrationChange: (narration?: Narration) => void;
  export let narrationActionExecutionContext: NarrationActionExecutionContext;

  function executeNarrationAction(narrationAction: NarrationAction) {
    const newNarration = narrationAction.execute(narrationActionExecutionContext);
    onNarrationChange(newNarration);
  }
</script>

<div class="flex flex-col divide-y-[2px] divide-black w-full">
  <div class="p-[10px]">
    <TranslatableTextView text={narration.title} />
  </div>
  <div class="overflow-auto">
    <div class="p-[10px]">
      {#if narration.description.character && narration.description.character.avatarUrl}
        <img
          src={narration.description.character.avatarUrl}
          alt="Character avatar"
          width={64}
          height={64}
          class="float-left border-[2px] border-black mr-[10px]"
        />
      {/if}
      <TranslatableTextView text={narration.description.text} />
    </div>
    <div class="p-[10px]">
      {#each narration.actions as action}
        <div on:click={() => executeNarrationAction(action)} class="cursor-pointer text-blue-700 hover:text-blue-400">
          <TranslatableTextView text={action.getName()} />
        </div>
      {/each}
    </div>
  </div>
</div>
