<script lang="ts">
  import type { Narration } from '../model/narration';
  import type { NarrationActionExecutionContext } from '../model/narration-action-execution-context';
  import NarrationPanel from './narration-panel.svelte';

  export let narration: Narration;
  export let onNarrationChange: (narration?: Narration) => void;
  export let narrationActionExecutionContext: NarrationActionExecutionContext;
</script>

<div
  class="flex fixed bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-[2px] border-black divide-y-[2px] divide-black w-[800px] h-[600px]"
>
  <NarrationPanel {narration} {onNarrationChange} {narrationActionExecutionContext} />
</div>
