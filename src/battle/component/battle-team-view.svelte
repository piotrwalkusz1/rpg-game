<script lang="ts">
  import type { BattleTeam } from '../model/battle-team';
  import BattleParticipantView from './battle-participant-view.svelte';

  export let team: BattleTeam;
</script>

<div class="flex flex-col border-[2px] border-black p-[15px] overflow-auto">
  {#each team.participants as participant}
    <div class="p-[5px]">
      <BattleParticipantView {participant} />
    </div>
  {/each}
</div>
