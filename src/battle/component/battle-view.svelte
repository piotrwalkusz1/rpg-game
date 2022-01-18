<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import type { Character } from '../../character/model/character';
  import Dialog from '../../common/component/dialog.svelte';
  import { gameState } from '../../common/store';
  import { NarrationService } from '../../narration/service/narration-service';
  import { AttackBattleAction } from '../model/actions/attack-battle-action';
  import type { Battle } from '../model/battle';
  import type { BattleActionExecutionContext } from '../model/battle-action-execution-context';
  import type { BattleParticipant } from '../model/battle-participant';
  import { BattleService } from '../service/battle-service';
  import BattleQueueView from './battle-queue-view.svelte';
  import BattleTeamView from './battle-team-view.svelte';

  export let battle: Battle;

  const battleActionExecutionContext: BattleActionExecutionContext = {
    dealDamage: (target: Character, damage: number) => {
      target.dealDamage(damage);
      $gameState = $gameState;
    }
  };
  let nextAIScheduledTurn: NodeJS.Timeout | undefined = undefined;
  let endBattleTimeout: NodeJS.Timeout | undefined = undefined;

  onMount(() => {
    if (!isPlayerTurn()) {
      scheduleAITurn();
    }
  });

  onDestroy(() => {
    nextAIScheduledTurn && clearTimeout(nextAIScheduledTurn);
    endBattleTimeout && clearTimeout(endBattleTimeout);
  });

  function getParticipantStyle(participant: BattleParticipant): string | undefined {
    if (participant === getNextParticipant()) {
      return 'shadow-[0_0_7px_2px_blue]';
    }
    if (isPlayerTurn() && isEnemyOfPlayer(participant) && participant.canStillFight()) {
      return 'hover:shadow-[0_0_7px_2px_red]';
    }
  }

  function onParticipantClick(participant: BattleParticipant): void {
    if (isPlayerTurn() && isEnemyOfPlayer(participant) && participant.canStillFight()) {
      const action = new AttackBattleAction({ attacker: getPlayerCharacter(), target: participant.character });
      BattleService.executeAction(action, battleActionExecutionContext);
      nextTurn();
    }
  }

  function nextTurn(): void {
    if (battle.isBattleEnded()) {
      endBattleTimeout = setTimeout(() => finishBattle(), 2000);
      return;
    }

    battle.queue.pop();
    battle.queue.refreshQueue();
    if (battle.queue.length === 0) {
      battle.queue.recreateQueue();
    }
    if (!isPlayerTurn()) {
      scheduleAITurn();
    }
  }

  function isEnemyOfPlayer(participant: BattleParticipant): boolean {
    return battle.areEnemies(getPlayerCharacter(), participant.character);
  }

  function isPlayerTurn(): boolean {
    return getPlayerCharacter() === getNextParticipantCharacter();
  }

  function scheduleAITurn(): void {
    nextAIScheduledTurn = setTimeout(() => executeAITurn(), 1000);
  }

  function executeAITurn(): void {
    const nextParticipantCharacter = getNextParticipantCharacter();
    if (!nextParticipantCharacter) {
      nextTurn();
      return;
    }
    const enemy: BattleParticipant | undefined = battle.getEnemiesOfCharacterThanStillCanFight(nextParticipantCharacter)[0];
    if (enemy) {
      const action = new AttackBattleAction({ attacker: nextParticipantCharacter, target: enemy.character });
      BattleService.executeAction(action, battleActionExecutionContext);
    }
    nextTurn();
  }

  function finishBattle(): void {
    for (const participant of battle.participants) {
      if (participant.character.healthPoints === 0) {
        participant.character.remove();
      }
    }
    $gameState.battle = undefined;
    $gameState.narration = $gameState.selectedField && NarrationService.getNarrationForField($gameState.selectedField, $gameState);
  }

  function getNextParticipantCharacter(): Character | undefined {
    return getNextParticipant()?.character;
  }

  function getNextParticipant(): BattleParticipant | undefined {
    return battle.isBattleEnded() ? undefined : battle.queue.queue[0];
  }

  function getPlayerCharacter(): Character {
    return $gameState.player;
  }
</script>

<Dialog>
  <div class="flex flex-col w-full h-full divide-y-[2px] divide-black">
    <div class="flex grow w-full justify-between">
      <div class="flex p-[15px]">
        <BattleTeamView team={battle.firstTeam} {getParticipantStyle} {onParticipantClick} />
      </div>
      <div class="flex p-[15px]">
        <BattleTeamView team={battle.secondTeam} {getParticipantStyle} {onParticipantClick} />
      </div>
    </div>
    <div class="p-[15px]">
      <BattleQueueView />
    </div>
  </div>
</Dialog>
