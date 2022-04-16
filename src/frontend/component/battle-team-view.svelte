<script lang="ts">
  import type { Character } from '../../engine/core/character/model/character';
  import BattleParticipantView from './battle-participant-view.svelte';

  export let members: Character[];
  export let getParticipantStyle: (participant: Character) => string | undefined;
  export let onParticipantClick: ((participant: Character) => void) | undefined = undefined;
</script>

<div class="flex flex-col border-[2px] border-black p-[15px] overflow-auto">
  {#each members as participant}
    <div class="p-[5px]">
      <BattleParticipantView {participant} {getParticipantStyle} onClick={() => onParticipantClick && onParticipantClick(participant)} />
    </div>
  {/each}
</div>
