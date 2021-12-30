<script lang="ts">
  import { faSearchMinus } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import type { GameState } from '../../game/model/game-state';
  import TranslatableTextView from '../../i18n/translatable-text-view.svelte';
  import type { MapField } from '../model/map-field';
  import TerrainView from './terrain-view.svelte';

  export let gameState: GameState;
  export let onFieldClick: (field: MapField) => void;

  function zoomOut() {
    if (gameState.currentLocationView.parentField) {
      gameState.currentLocationView = gameState.currentLocationView.parentField.location;
    }
  }
</script>

<div class="flex flex-col divide-y-[2px] divide-black h-full ">
  <div class="text-center font-bold py-[5px]">
    <TranslatableTextView text={gameState.currentLocationView.name} />
  </div>
  <div class="grow flex divide-x-[2px] divide-black overflow-hidden">
    <div class="min-w-[64px] max-w-[64px] divide-y-[2px] divide-black">
      <div on:click={zoomOut} class="h-[64px] relative text-[48px] cursor-pointer hover:text-blue-300">
        <div class="absolute top-[7px] left-[6px]">
          <Fa icon={faSearchMinus} />
        </div>
      </div>
      <div />
    </div>
    <div class="grow overflow-auto flex">
      <div class="grow" />
      <div class="flex flex-col">
        <div class="grow" />
        <div>
          <TerrainView {gameState} {onFieldClick} />
        </div>
        <div class="grow" />
      </div>
      <div class="grow" />
    </div>
  </div>
</div>
