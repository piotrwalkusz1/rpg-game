<script lang="ts">
  import Border from 'frontend/component/borders/border.svelte';

  export let image: string | undefined;

  $: bgImage = image ? `background-image: url("${image}");` : '';
</script>

<Border class="w-[70px] h-[70px]" width={3} gradient="#7B5900, #594000">
  <div class="w-[64px] h-[64px]" style={bgImage} />
</Border>
