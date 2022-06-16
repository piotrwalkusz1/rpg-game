<script lang="ts">
  import { millisecondsToHours } from 'date-fns/esm';
  import type { Time } from 'engine/core/time';
  import { engine } from 'frontend/store';
  import { lerp } from 'utils';

  $: angle = calculateAngle($engine.time);

  function calculateAngle(time: Time) {
    return lerp(-46, 46, partOfDay(time));

    function partOfDay(time: Time): number {
      return millisecondsToHours(time.getTime() - morning(time)) / 12;
    }

    function morning(time: Time): number {
      return new Date(time).setHours(6, 0, 0, 0);
    }
  }
</script>

<div class="absolute left-[50%] right-[50%] top-[50%] bottom-[50%]">
  <div class="bg-red-700 translate-x-[-50%] translate-y-[-50%]">
    <div class="absolute sun-path translate-x-[-50%] translate-y-[-50%]" />
    <div class="absolute sun" style="--angle: {angle}deg" />
  </div>
</div>

<style>
  .sun {
    --angle: 0def;

    width: 30px;
    height: 30px;
    background-image: url('/images/ui/sun.png');
    background-size: contain;
    transform: translate(-50%, calc(-50% - 18px)) rotate(var(--angle));
    transform-origin: 50% 138px;
  }

  .sun-path {
    width: 186px;
    height: 46px;
    background-image: url('/images/ui/sundial.svg');
  }
</style>
