<script lang="ts">
  import { startOfDay } from 'date-fns';
  import { differenceInSeconds } from 'date-fns/esm';
  import { engine } from 'frontend/store';

  const SECONDS_IN_DAY = 24 * 60 * 60;

  $: partOfDay = differenceInSeconds($engine.time, startOfDay($engine.time)) / SECONDS_IN_DAY;
</script>

<div class="relative">
  <div class="h-[5px] bg-yellow-200" />
  <img
    class="absolute top-[50%] translate-x-[-50%] translate-y-[-50%]"
    style={`left: ${partOfDay * 100}%;`}
    src="images/ui/sun.png"
    alt="Sun"
    width="25px"
    height="25px"
  />
</div>
