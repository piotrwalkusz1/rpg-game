<!-- App.svelte -->
<script lang="ts">
  import TranslatableTextView from '../../i18n/translatable-text-view.svelte';
  import type { Action } from '../model/action';
  import type { ActionContext } from '../model/action-context';
  import type { ActionExecutionContext } from '../model/action-execution-context';

  export let actionContext: ActionContext;
  export let actionExecutionContext: ActionExecutionContext;

  function executeAction(action: Action) {
    actionExecutionContext.changeActionContext(undefined);
    action.executeAction(actionExecutionContext);
  }
</script>

<div
  class="fixed bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-[2px] border-black divide-y-[2px] divide-black w-[800px] h-[600px]"
>
  <div class="p-[10px]">
    <TranslatableTextView text={actionContext.title} />
    {#if !actionContext.isActionRequired}
      <button on:click={() => actionExecutionContext.changeActionContext(undefined)} class="float-right">X</button>
    {/if}
  </div>
  <div class="p-[10px] overflow-auto">
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
