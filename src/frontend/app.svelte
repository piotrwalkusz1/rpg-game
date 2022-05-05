<script lang="ts">
  import AvatarWithName from 'frontend/component/avatar-with-name.svelte';
  import BorderDivideHorizontal from 'frontend/component/borders/border-divide-horizontal.svelte';
  import BorderDivideVertical from 'frontend/component/borders/border-divide-vertical.svelte';
  import Border from 'frontend/component/borders/border.svelte';
  import LocationView from 'frontend/component/location-view.svelte';
  import NarrationView from 'frontend/component/narration-view.svelte';
  import Sundial from 'frontend/component/sundial.svelte';
  import { initLocalizationContext } from 'i18n/translation-service';

  const { i18n } = initLocalizationContext();
  i18n.addResourceBundle('en', 'common', {});
  i18n.addResourceBundle('pl', 'common', {});
</script>

<div class="relative h-full bg-[url('/images/background.jpg')]">
  <Border class="w-full h-full">
    <div class="flex flex-col h-full">
      <div class="relative h-[107px] min-h-[107px] p-border">
        <AvatarWithName avatar="/images/characters/001_Eladin.png" name={{ literal: 'Eladin' }} />
        <Sundial />
      </div>
      <BorderDivideHorizontal />
      <div class="flex grow min-h-[0px]">
        <div class="w-[116px] min-w-[116px]" />
        <BorderDivideVertical />
        <div class="flex flex-col grow min-w-[0px]">
          <div class="grow min-h-[0px]">
            <LocationView />
          </div>
          <BorderDivideHorizontal />
          <div class="h-[78px] min-h-[78px]" />
        </div>
        <BorderDivideVertical />
        <div class="w-[288px] min-w-[288px] p-border">
          <NarrationView />
        </div>
      </div>
    </div>
  </Border>
</div>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :root {
    --border-width: 5px;
    --border-gradient: #c79b00, #edc22b, #c79b00;
  }

  @font-face {
    font-family: 'IM FELL English';
    src: url(/fonts/IMFellEnglish-Regular.ttf);
  }
</style>
