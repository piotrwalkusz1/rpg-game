<script lang="ts">
  import { gameState } from '../../common/store';
  import TranslatableTextView from '../../i18n/translatable-text-view.svelte';
</script>

<div class="text-center font-bold py-[5px]">
  <TranslatableTextView text={$gameState.locationView.name} />
  -
  <div>{$gameState.currentTime}</div>
</div>
