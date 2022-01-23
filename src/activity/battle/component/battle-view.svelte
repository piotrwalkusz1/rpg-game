<script lang="ts">
  import { getContext } from 'svelte';
  import type { Character } from '../../../character/model/character';
  import Dialog from '../../../common/component/dialog.svelte';
  import { gameState } from '../../../common/store';
  import { GameContext } from '../../../game/model/game-context';
  import { GameLoopService } from '../../../game/service/game-loop-service';
  import { AttackNarrationAction } from '../../../narration/model/narration-actions/attack-narration-action';
  import type { BattleNarration } from '../model/battle-narration';
  import BattleTeamView from './battle-team-view.svelte';

  export let battle: BattleNarration;

  const gameContext: GameContext = getContext(GameContext.KEY);

  $: battleActivity = battle.battleActivity;
  $: allies = battleActivity.getAllies($gameState.player);
  $: enemies = battleActivity.getEnemies($gameState.player);

  function getParticipantStyle(participant: Character): string | undefined {
    if (participant === battle.currentParticipant) {
      return 'shadow-[0_0_7px_2px_blue]';
    }
    if (isEnemyOfPlayer(participant) && battleActivity.canStillFight(participant)) {
      return 'hover:shadow-[0_0_7px_2px_red]';
    }
  }

  function onParticipantClick(participant: Character): void {
    if (isEnemyOfPlayer(participant) && battleActivity.canStillFight(participant)) {
      const narrationAction = new AttackNarrationAction(participant);
      GameLoopService.executePlayerTurn(narrationAction, gameContext);
    }
  }

  function isEnemyOfPlayer(participant: Character): boolean {
    return battleActivity.areEnemies($gameState.player, participant);
  }
</script>

<Dialog>
  <div class="flex flex-col w-full h-full divide-y-[2px] divide-black">
    <div class="flex grow w-full justify-between">
      <div class="flex p-[15px]">
        <BattleTeamView members={allies} {getParticipantStyle} {onParticipantClick} />
      </div>
      <div class="flex p-[15px]">
        <BattleTeamView members={enemies} {getParticipantStyle} {onParticipantClick} />
      </div>
    </div>
  </div>
</Dialog>
