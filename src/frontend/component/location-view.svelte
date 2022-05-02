<script lang="ts">
  import FieldView from 'frontend/component/field-view.svelte';
  import { displayedLocation, selectedField } from 'frontend/store';
</script>

<div class="flex h-full overflow-hidden">
  <div class="grow flex divide-x-[2px] divide-black overflow-hidden">
    <div class="grow overflow-auto flex">
      <div class="grow" />
      <div class="flex flex-col">
        <div class="grow" />
        <div class="shadow-[0_0px_6px_0px_rgba(0,0,0,0.75)]">
          {#each $displayedLocation.getRectSubFields() as row}
            <div class="flex flex-row">
              {#each row as field}
                <FieldView {field} on:click={() => ($selectedField = field)} />
              {/each}
            </div>
          {/each}
        </div>
        <div class="grow" />
      </div>
      <div class="grow" />
    </div>
  </div>
</div>
