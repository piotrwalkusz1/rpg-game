<script lang="ts">
  import { Field, FieldObject } from 'engine/core/field';
  import { player, selectedField } from 'frontend/store';

  export let field: Field;

  $: bgImage = field.image ? `background-image: url("${field.image}")` : '';
</script>

<div class="relative" on:click>
  <div class="absolute w-[64px] h-[64px]" class:player-position={field === $player.requireComponent(FieldObject).field} />
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
    --color-1: rgb(0, 52, 194);
    --color-2: rgb(145, 173, 250);

    border-style: solid;
    border-width: 1px;
    border-image: conic-gradient(
        from var(--angle),
        var(--color-1),
        var(--color-2),
        var(--color-1),
        var(--color-2),
        var(--color-1),
        var(--color-2),
        var(--color-1),
        var(--color-2),
        var(--color-1)
      )
      1;
    animation: 10s rotate linear infinite;
  }

  .player-position {
    --color-1: rgb(194, 178, 0);
    --color-2: rgb(250, 250, 145);

    border-style: solid;
    border-width: 1px;
    border-image: conic-gradient(
        from var(--angle),
        var(--color-1),
        var(--color-2),
        var(--color-1),
        var(--color-2),
        var(--color-1),
        var(--color-2),
        var(--color-1),
        var(--color-2),
        var(--color-1)
      )
      1;
    animation: 10s rotate linear infinite;
  }
</style>
