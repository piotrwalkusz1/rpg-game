<script lang="ts">
  import Dialog from '../../common/component/dialog.svelte';
  import { gameState } from '../../common/store';
  import BattleTeamView from './battle-team-view.svelte';
</script>

{#if $gameState.battle}
  <Dialog>
    <div class="flex w-full justify-between">
      <div class="flex p-[15px]">
        <BattleTeamView team={$gameState.battle.firstTeam} />
      </div>
      <div class="flex p-[15px]">
        <BattleTeamView team={$gameState.battle.secondTeam} />
      </div>
    </div>
  </Dialog>
{/if}
