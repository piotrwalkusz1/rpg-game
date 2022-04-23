<script lang="ts">
  import { format } from 'date-fns';
  import { setContext } from 'svelte';
  import { MockedGame } from '../demo/mocked-game';
  import { GameContext } from '../engine/core/game/model/game-context';
  import TranslatableTextView from '../i18n/translatable-text-view.svelte';
  import { initLocalizationContext } from '../i18n/translation-service';
  import BattleView from './component/battle-view.svelte';
  import CharacterProfileView from './component/character-profile-view.svelte';
  import BlockedBackground from './component/common/blocked-background.svelte';
  import Dialog from './component/common/dialog.svelte';
  import LocationNameView from './component/location-name-view.svelte';
  import LocationView from './component/location-view.svelte';
  import NarrationPanel from './component/narration-panel.svelte';
  import TimeView from './component/time-view.svelte';
  import Toolbox from './component/toolbox.svelte';
  import { gameState } from './store';

  const { i18n } = initLocalizationContext();
  i18n.addResourceBundle('en', 'common', {});
  i18n.addResourceBundle('pl', 'common', {});

  const gameContext = new GameContext({
    setBlockedScreen: (blockedScreen) => ($gameState.blockedScreen = blockedScreen),
    refresh: () => ($gameState = $gameState)
  });

  $: narration = $gameState.narration;
  setContext(GameContext.KEY, gameContext);

  function repeatGame() {
    $gameState = MockedGame.createGameState();
  }
</script>

<div class="border-2 border-black divide-y-[2px] divide-black h-full flex flex-col">
  <CharacterProfileView character={$gameState.player} />
  <div class="flex flex-col grow overflow-hidden divide-y-[2px] divide-black">
    <div class="flex items-center">
      <div class="flex-1">
        <div class="px-[10%]">
          <TimeView />
        </div>
      </div>
      <div class="px-[10px]">
        {format($gameState.currentTime, 'HH:mm:ss')}
      </div>
      <LocationNameView />
      <div class="flex-1" />
    </div>
    <div class="flex grow divide-x-[2px] divide-black overflow-hidden">
      <Toolbox />
      <LocationView />
      <div class="w-[300px] flex">
        {#if narration && !narration.isActionRequired}
          <NarrationPanel />
        {/if}
      </div>
    </div>
  </div>
</div>

{#if narration && narration.isActionRequired}
  <Dialog>
    <NarrationPanel />
  </Dialog>
{/if}

{#if $gameState.battle}
  <BattleView bind:battle={$gameState.battle} />
{/if}

{#if $gameState.player.position === undefined}
  <Dialog>
    <div class="flex flex-col w-full justify-center items-center">
      <div class="text-[60px] font-bold"><TranslatableTextView text="GAME.MESSAGE.YOU_ARE_DEAD" /></div>
      <div on:click={repeatGame} class="text-[30px] font-bold cursor-pointer hover:text-blue-300">
        <TranslatableTextView text="GAME.BUTTON.REPEAT" />
      </div>
    </div>
  </Dialog>
{/if}

{#if $gameState.blockedScreen}
  <BlockedBackground z={3000} />
{/if}

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
