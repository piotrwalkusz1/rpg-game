<script lang="ts">
  import { faSearchMinus } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import type { GameState } from '../../game/model/game-state';

  export let gameState: GameState;

  function zoomOut() {
    if (gameState.locationView.parentField) {
      gameState.locationView = gameState.locationView.parentField.location;
    }
  }
</script>

<div class="min-w-[64px] max-w-[64px] divide-y-[2px] divide-black">
  <div on:click={zoomOut} class="h-[64px] relative text-[48px] cursor-pointer hover:text-blue-300">
    <div class="absolute top-[7px] left-[6px]">
      <Fa icon={faSearchMinus} />
    </div>
  </div>
  <div />
</div>
