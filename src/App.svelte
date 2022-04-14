<script lang="ts">
  import { format } from 'date-fns';
  import { setContext } from 'svelte';
  import BattleView from './activity/battle/component/battle-view.svelte';
  import CharacterProfileView from './character/component/character-profile-view.svelte';
  import BlockedBackground from './common/component/blocked-background.svelte';
  import Dialog from './common/component/dialog.svelte';
  import { animatedCurrentTime,gameState } from './common/store';
  import Toolbox from './game/component/toolbox.svelte';
  import { GameContext } from './game/model/game-context';
  import { MockedGame } from './game/service/mocked-game';
  import TranslatableTextView from './i18n/translatable-text-view.svelte';
  import { initLocalizationContext } from './i18n/translation-service';
  import LocationNameView from './map/component/location-name-view.svelte';
  import LocationView from './map/component/location-view.svelte';
  import NarrationPanel from './narration/component/narration-panel.svelte';
  import TimeView from './time/component/time-view.svelte';

  const { i18n } = initLocalizationContext();
  i18n.addResourceBundle('en', 'common', {});
  i18n.addResourceBundle('pl', 'common', {});

  const gameContext = new GameContext({
    changeCharacterPosition: (character, position) => {
      character.position = position;
      $gameState = $gameState;
    },
    addKnownLocation: (character, terrainObject) => {
      character.addKnownLocation(terrainObject);
      $gameState = $gameState;
    },
    addGameEvent: (event) => {
      $gameState.eventQueue.addEvent(event);
      $gameState = $gameState;
    },
    popNextGameEvent: () => {
      const nextEvent = $gameState.eventQueue.popNextEvent();
      $gameState = $gameState;
      return nextEvent;
    },
    setCurrentTime: (time) => {
      $gameState.currentTime = time;
      animatedCurrentTime.set(time, 0);
    },
    dealDamage: (target, damage) => {
      target.dealDamage(damage);
      $gameState = $gameState;
    },
    setNarration: (narration) => ($gameState.narration = narration),
    setBattle: (battle) => ($gameState.battle = battle),
    changeLocationView: (newLocationView) => ($gameState.locationView = newLocationView),
    getGameState: () => $gameState,
    setPendingNarrationSequence: (pendingNarrationSequence) => ($gameState.pendingNarrationSequence = pendingNarrationSequence),
    addActivity: (character, activity) => {
      character.addActivity(activity);
      $gameState = $gameState;
    },
    removeActivity: (character, activity) => {
      character.removeActivity(activity);
      $gameState = $gameState;
    },
    setBlockedScreen: (blockedScreen) => ($gameState.blockedScreen = blockedScreen),
    changeTime: async (newTime, duration) => {
      $gameState.blockedScreen = true;
      $gameState.currentTime = newTime;
      await animatedCurrentTime.set(newTime, duration);
      $gameState.blockedScreen = false;
    },
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
