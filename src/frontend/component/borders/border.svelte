<script lang="ts">
  export let width: number = 5;
  export let gradient: string = '#c79b00, #edc22b, #c79b00';
  let className = '';
  export { className as class };
</script>

<div class="gradient-border {className}" style="--border-width: {width}px; --border-gradient: {gradient};">
  <div class="content">
    <slot />
  </div>
  <div class="triangle" />
  <div class="triangle rotate-90 scale-y-[-1]" />
  <div class="triangle right-0 scale-x-[-1]" />
  <div class="triangle right-0 rotate-90" />
  <div class="triangle bottom-0 rotate-[-90deg]" />
  <div class="triangle bottom-0 scale-y-[-1]" />
  <div class="triangle right-0 bottom-0 rotate-90 scale-x-[-1]" />
  <div class="triangle right-0 bottom-0 rotate-180" />
</div>

<style>
  .gradient-border {
    position: relative;
    background: linear-gradient(to top, var(--border-gradient)) top / calc(100% - 2 * var(--border-width)) var(--border-width),
      linear-gradient(to bottom, var(--border-gradient)) bottom/calc(100% - 2 * var(--border-width)) var(--border-width),
      linear-gradient(to right, var(--border-gradient)) right / var(--border-width) calc(100% - 2 * var(--border-width)),
      linear-gradient(to left, var(--border-gradient)) left / var(--border-width) calc(100% - 2 * var(--border-width));
    background-repeat: no-repeat;
  }

  .triangle {
    position: absolute;
    clip-path: polygon(0 0, 100% 100%, 0 100%);
    width: var(--border-width);
    height: var(--border-width);
    background-image: linear-gradient(to left, var(--border-gradient));
  }

  .content {
    position: absolute;
    padding: var(--border-width);
    width: 100%;
    height: 100%;
  }
</style>
