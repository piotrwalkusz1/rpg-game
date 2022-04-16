<script lang="ts">
  import type { Actor } from '../../engine/core/actor/model/actor';
  import BattleParticipantView from './battle-participant-view.svelte';

  export let members: Actor[];
  export let getParticipantStyle: (participant: Actor) => string | undefined;
  export let onParticipantClick: ((participant: Actor) => void) | undefined = undefined;
</script>

<div class="flex flex-col border-[2px] border-black p-[15px] overflow-auto">
  {#each members as participant}
    <div class="p-[5px]">
      <BattleParticipantView {participant} {getParticipantStyle} onClick={() => onParticipantClick && onParticipantClick(participant)} />
    </div>
  {/each}
</div>
