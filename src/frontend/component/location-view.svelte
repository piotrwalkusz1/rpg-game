<script lang="ts">
  import { FieldNarrationContext } from 'frontend/narration/narration-contexts/field-narration-context';
  import { displayedLocation, narrationContext, selectedField } from 'frontend/store';
  import FieldView from './field-view.svelte';
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
                <FieldView
                  {field}
                  on:click={() => {
                    $selectedField = field;
                    $narrationContext = new FieldNarrationContext(field);
                  }}
                />
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
