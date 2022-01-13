<script lang="ts">
  import { faBahai, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import { gameState } from '../../common/store';
  import { NarrationService } from '../../narration/service/narration-service';

  function goToPlayerLocation() {
    const playerLocation = $gameState.player.character.position?.field?.location;
    if (playerLocation) {
      $gameState.locationView = playerLocation;
      $gameState.selectedField = $gameState.player.character.position?.field;
      $gameState.narration = $gameState.selectedField
        ? NarrationService.getNarrationForField($gameState.selectedField, $gameState)
        : undefined;
    }
  }

  function zoomOut() {
    if ($gameState.locationView.parentField) {
      $gameState.locationView = $gameState.locationView.parentField.location;
      $gameState.selectedField = undefined;
      $gameState.narration = undefined;
    }
  }
</script>

<div class="min-w-[64px] max-w-[64px] divide-y-[2px] divide-black">
  <div on:click={goToPlayerLocation} class="h-[64px] relative text-[48px] cursor-pointer hover:text-blue-300">
    <div class="absolute top-[7px] left-[6px]">
      <Fa icon={faBahai} />
    </div>
  </div>
  <div on:click={zoomOut} class="h-[64px] relative text-[48px] cursor-pointer hover:text-blue-300">
    <div class="absolute top-[7px] left-[6px]">
      <Fa icon={faSearchMinus} />
    </div>
  </div>
  <div />
</div>
