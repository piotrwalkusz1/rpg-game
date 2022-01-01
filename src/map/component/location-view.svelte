<script lang="ts">
  import type { GameState } from '../../game/model/game-state';
  import type { MapField } from '../model/map-field';
  import FieldView from './field-view.svelte';

  export let gameState: GameState;
  export let onFieldClick: (field: MapField) => void;

  function getFieldStyle(field: MapField): string {
    if (gameState.player.character.isOnField(field)) {
      return 'w-[64px] h-[64px] outline outline-[2px] outline-offset-[-2px] outline-blue-500 hover:outline-white';
    } else {
      return 'w-[64px] h-[64px] hover:outline outline-[2px] outline-offset-[-2px] outline-white';
    }
  }
</script>

<div class="grow flex divide-x-[2px] divide-black overflow-hidden">
  <div class="grow overflow-auto flex">
    <div class="grow" />
    <div class="flex flex-col">
      <div class="grow" />
      <div>
        {#each gameState.locationView.fields as row}
          <div class="flex flex-row">
            {#each row as field}
              <div class={getFieldStyle(field)} on:click={() => onFieldClick(field)}>
                <FieldView {field} />
              </div>
            {/each}
          </div>
        {/each}
      </div>
      <div class="grow" />
    </div>
    <div class="grow" />
  </div>
</div>
