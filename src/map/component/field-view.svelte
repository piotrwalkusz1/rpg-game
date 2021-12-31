<script lang="ts">
  import type { MapField } from '../model/map-field';

  export let field: MapField;
</script>

{#if field.terrainObject}
  <div class="relative -z-[100]">
    <img class="absolute" src={field.fieldType.imageUrl} alt="Terrain" width={64} height={64} />
    <img class="absolute" src={field.terrainObject.imageUrl} alt="Terrain object" width={64} height={64} />
  </div>
{:else}
  <img src={field.fieldType.imageUrl} alt="Terrain" width={64} height={64} />
{/if}
