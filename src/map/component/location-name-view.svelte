<script lang="ts">
  import type { GameState } from '../../game/model/game-state';
  import TranslatableTextView from '../../i18n/translatable-text-view.svelte';

  export let gameState: GameState;
</script>

<div class="text-center font-bold py-[5px]">
  <TranslatableTextView text={gameState.locationView.name} />
</div>
