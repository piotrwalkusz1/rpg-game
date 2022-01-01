<script lang="ts">
  import TranslatableTextView from '../../i18n/translatable-text-view.svelte';
  import type { Action } from '../model/actions/action';
  import type { ActionContext } from '../model/action-context';
  import type { ActionExecutionContext } from '../model/action-execution-context';

  export let actionContext: ActionContext;
  export let onActionContextChange: (actionContext?: ActionContext) => void;
  export let actionExecutionContext: ActionExecutionContext;

  function executeAction(action: Action) {
    const newActionContext = action.executeAction(actionExecutionContext);
    onActionContextChange(newActionContext);
  }
</script>

<div class="flex flex-col divide-y-[2px] divide-black w-full">
  <div class="p-[10px]">
    <TranslatableTextView text={actionContext.title} />
  </div>
  <div class="overflow-auto">
    <div class="p-[10px]">
      {#if actionContext.description.character && actionContext.description.character.avatarUrl}
        <img
          src={actionContext.description.character.avatarUrl}
          alt="Character avatar"
          width={64}
          height={64}
          class="float-left border-[2px] border-black mr-[10px]"
        />
      {/if}
      <TranslatableTextView text={actionContext.description.text} />
    </div>
    <div class="p-[10px]">
      {#each actionContext.actions as action}
        <div on:click={() => executeAction(action)} class="cursor-pointer text-blue-700 hover:text-blue-400">
          <TranslatableTextView text={action.name} />
        </div>
      {/each}
    </div>
  </div>
</div>
