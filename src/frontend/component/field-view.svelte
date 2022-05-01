<script lang="ts">
  import type { Field } from 'engine/core/field';

  export let field: Field;

  $: bgImage = field.imageUrl ? `background-image: url("${field.imageUrl}")` : '';
</script>

<div class="w-[64px] h-[64px]" style={bgImage} />
