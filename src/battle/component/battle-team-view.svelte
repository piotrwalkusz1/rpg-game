<script lang="ts">
  import type { BattleParticipant } from '../model/battle-participant';
  import type { BattleTeam } from '../model/battle-team';
  import BattleParticipantView from './battle-participant-view.svelte';

  export let team: BattleTeam;
  export let getParticipantStyle: (participant: BattleParticipant) => string | undefined;
  export let onParticipantClick: ((participant: BattleParticipant) => void) | undefined = undefined;
</script>

<div class="flex flex-col border-[2px] border-black p-[15px] overflow-auto">
  {#each team.participants as participant}
    <div class="p-[5px]">
      <BattleParticipantView {participant} {getParticipantStyle} onClick={() => onParticipantClick && onParticipantClick(participant)} />
    </div>
  {/each}
</div>
