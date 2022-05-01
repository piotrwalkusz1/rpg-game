<div class="gradient-border">
  <div class="triangle scale-x-[-1]" />
  <div class="triangle right-0" />
</div>

<style>
  .gradient-border {
    position: relative;
    margin-left: calc(var(--border-width) * -1);
    margin-right: calc(var(--border-width) * -1);
    height: var(--border-width);
    min-height: var(--border-width);
    background: linear-gradient(to top, var(--border-gradient)) top / calc(100% - 2 * var(--border-width)) var(--border-width);
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
