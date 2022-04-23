<script lang="ts">
  import type { MapField } from '../../engine/core/map/model/map-field';
  import { gameState } from '../store';
  import FieldView from './field-view.svelte';

  function getFieldStyle(field: MapField): string {
    let style = 'w-[64px] h-[64px] hover:outline outline-[2px] outline-offset-[-2px] hover:outline-white';
    if ($gameState.player.isOnField(field)) {
      style += ' outline outline-blue-500';
    } else if ($gameState.selectedField === field) {
      style += ' outline outline-yellow-500';
    }
    return style;
  }

  function onFieldClick(field: MapField) {
    $gameState.selectedField = field;
  }
</script>

<div class="grow flex divide-x-[2px] divide-black overflow-hidden">
  <div class="grow overflow-auto flex">
    <div class="grow" />
    <div class="flex flex-col">
      <div class="grow" />
      <div>
        {#each $gameState.locationView.fields as row}
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
