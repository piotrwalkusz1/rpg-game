<script lang="ts">
  import type { Field } from 'engine/core/field';
  import { selectedField } from 'frontend/store';

  export let field: Field;

  $: bgImage = field.imageUrl ? `background-image: url("${field.imageUrl}")` : '';
</script>

<div class="relative" on:click>
  <div class="absolute w-[64px] h-[64px]" class:selected={field === $selectedField} />
  <div class="w-[64px] h-[64px]" style={bgImage} />
</div>

<style type="text/postcss">
  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  @keyframes rotate {
    to {
      --angle: 360deg;
    }
  }

  .selected {
    border-style: solid;
    border-width: 2px;
    border-image: conic-gradient(
        from var(--angle),
        rgb(0, 52, 194),
        rgb(145, 173, 250),
        rgb(0, 52, 194),
        rgb(145, 173, 250),
        rgb(0, 52, 194),
        rgb(145, 173, 250),
        rgb(0, 52, 194),
        rgb(145, 173, 250),
        rgb(0, 52, 194)
      )
      1;
    animation: 10s rotate linear infinite;
  }
</style>
