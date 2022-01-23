<script lang="ts">
  import CharacterAvatarView from '../../../character/component/character-avatar-view.svelte';
  import type { Character } from '../../../character/model/character';

  export let participant: Character;
  export let getParticipantStyle: (participant: Character) => string | undefined;
  export let onClick: (() => void) | undefined = undefined;

  const baseStyle = 'border-[2px] border-black';

  $: additionalStyle = getParticipantStyle(participant);
  $: style = additionalStyle ? baseStyle + ' ' + additionalStyle : baseStyle;
</script>

<div class={style} on:click={onClick}>
  <CharacterAvatarView character={participant}>
    <div slot="overlay" class="absolute bg-red-700/50 bottom-0 left-0 right-0" style={`height: ${participant.lostPercentageOfHealth}%;`} />
  </CharacterAvatarView>
</div>
