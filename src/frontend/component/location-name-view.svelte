<script lang="ts">
  import TranslatableTextView from '../../i18n/translatable-text-view.svelte';
  import { gameState } from '../store';
</script>

<div class="text-center font-bold py-[5px]">
  <TranslatableTextView text={$gameState.locationView.name} />
</div>
