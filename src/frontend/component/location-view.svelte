<script lang="ts">
  import FieldView from 'frontend/component/field-view.svelte';
  import { displayedLocation } from 'frontend/store';
</script>

<div class="flex h-full overflow-hidden">
  <div class="grow flex divide-x-[2px] divide-black overflow-hidden">
    <div class="grow overflow-auto flex">
      <div class="grow" />
      <div class="flex flex-col">
        <div class="grow" />
        <div>
          {#each $displayedLocation.getRectSubFields() as row}
            <div class="flex flex-row">
              {#each row as field}
                <div>
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
</div>
