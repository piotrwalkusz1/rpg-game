<script lang="ts">
  import type { ActionContext } from '../model/action-context';
  import type { ActionExecutionContext } from '../model/action-execution-context';
  import ActionPanel from './action-panel.svelte';

  export let actionContext: ActionContext;
  export let onActionContextChange: (actionContext?: ActionContext) => void;
  export let actionExecutionContext: ActionExecutionContext;
</script>

<div
  class="flex fixed bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-[2px] border-black divide-y-[2px] divide-black w-[800px] h-[600px]"
>
  <ActionPanel {actionContext} {onActionContextChange} {actionExecutionContext} />
</div>
