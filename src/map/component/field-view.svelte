<script lang="ts">
  import type { MapField } from '../model/map-field';

  export let field: MapField;
</script>

{#if field.terrainObjects.length > 0}
  <div class="relative -z-[100]">
    <img class="absolute" src={field.fieldType.imageUrl} alt="Terrain" width={64} height={64} />
    <img class="absolute" src={field.terrainObjects[0].imageUrl} alt="Terrain object" width={64} height={64} />
  </div>
{:else}
  <img src={field.fieldType.imageUrl} alt="Terrain" width={64} height={64} />
{/if}
