<div class="gradient-border">
  <div class="triangle rotate-[-90deg]" />
  <div class="triangle bottom-0 rotate-[-90deg] scale-x-[-1]" />
  <!-- <div class="triangle right-0" /> -->
</div>

<style>
  .gradient-border {
    position: relative;
    margin-top: calc(var(--border-width) * -1);
    margin-bottom: calc(var(--border-width) * -1);
    width: var(--border-width);
    min-width: var(--border-width);
    height: calc(100% + 2 * var(--border-width));
    background: linear-gradient(to left, var(--border-gradient)) 0 var(--border-width) / var(--border-width)
      calc(100% - 2 * var(--border-width));
    background-repeat: no-repeat;
  }

  .triangle {
    position: absolute;
    clip-path: polygon(0 0, 0 100%, 50% 50%);
    width: var(--border-width);
    height: var(--border-width);
    background-image: linear-gradient(to top, var(--border-gradient));
    z-index: 100;
  }
</style>
