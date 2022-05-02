<script lang="ts">
  import Border from 'frontend/component/borders/border.svelte';

  export let image: string;
</script>

<Border class="w-[70px] h-[70px]" width={3} gradient="#7B5900, #594000">
  <div class="w-[64px] h-[64px]" style="background-image: url({image});" />
</Border>
