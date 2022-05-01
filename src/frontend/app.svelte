<script lang="ts">
  import BorderDivideHorizontal from 'frontend/component/borders/border-divide-horizontal.svelte';
  import BorderDivideVertical from 'frontend/component/borders/border-divide-vertical.svelte';
  import Border from 'frontend/component/borders/border.svelte';
  import LocationView from 'frontend/component/location-view.svelte';
  import { initLocalizationContext } from 'i18n/translation-service';

  const { i18n } = initLocalizationContext();
  i18n.addResourceBundle('en', 'common', {});
  i18n.addResourceBundle('pl', 'common', {});
</script>

<div class="relative h-full bg-[url('/images/background.jpg')]">
  <Border>
    <div class="flex flex-col h-full">
      <div class="h-[107px]" />
      <BorderDivideHorizontal />
      <div class="flex grow">
        <div class="w-[116px]" />
        <BorderDivideVertical />
        <div class="flex flex-col grow">
          <div class="grow">
            <LocationView />
          </div>
          <BorderDivideHorizontal />
          <div class="h-[78px]" />
        </div>
        <BorderDivideVertical />
        <div class="w-[288px]" />
      </div>
    </div>
  </Border>
</div>

<!-- <div class="border-2 border-black divide-y-[2px] divide-black h-full flex flex-col">
  <div class="flex flex-col grow overflow-hidden divide-y-[2px] divide-black">
    <div class="flex items-center">
      <div class="flex-1">
        <div class="px-[10%]">
          <TimeView />
        </div>
      </div>
      <div class="flex-1" />
    </div>
    <div class="flex grow divide-x-[2px] divide-black overflow-hidden">
      <LocationView />
    </div>
  </div>
</div>

{#if FieldUtils.getField($player) === undefined}
  <Dialog>
    <div class="flex flex-col w-full justify-center items-center">
      <div class="text-[60px] font-bold"><TranslatableTextView text="GAME.MESSAGE.YOU_ARE_DEAD" /></div>
      <div on:click={repeatGame} class="text-[30px] font-bold cursor-pointer hover:text-blue-300">
        <TranslatableTextView text="GAME.BUTTON.REPEAT" />
      </div>
    </div>
  </Dialog>
{/if}

{#if $blockedScreen}
  <BlockedBackground z={3000} />
{/if} -->
<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :root {
    --border-width: 5px;
    --border-gradient: #c79b00, #edc22b, #c79b00;
  }
</style>
