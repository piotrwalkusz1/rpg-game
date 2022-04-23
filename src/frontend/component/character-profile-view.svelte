<script lang="ts">
  import type { Entity } from 'engine/core/ecs';
  import CharacterAvatarView from './character-avatar-view.svelte';
  import CharacterDisplayNameView from './character-display-name-view.svelte';

  export let character: Entity;
</script>

<div class="flex divide-x-[2px] divide-black">
  <CharacterAvatarView {character} />
  <div class="pl-[8px] pt-[3px]">
    <CharacterDisplayNameView {character} />
  </div>
</div>
