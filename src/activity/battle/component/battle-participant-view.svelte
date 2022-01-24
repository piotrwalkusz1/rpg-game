<script lang="ts">
  import { differenceInMilliseconds } from 'date-fns';

  import CharacterAvatarView from '../../../character/component/character-avatar-view.svelte';
  import type { Character } from '../../../character/model/character';
  import { animatedCurrentTime } from '../../../common/store';

  export let participant: Character;
  export let getParticipantStyle: (participant: Character) => string | undefined;
  export let onClick: (() => void) | undefined = undefined;

  const baseStyle = 'border-[2px] border-black';

  $: additionalStyle = getParticipantStyle(participant);
  $: style = additionalStyle ? baseStyle + ' ' + additionalStyle : baseStyle;
  $: actionCompletionPercentage = getActionCompletionPercentage(
    participant.pendingAction?.scheduleTime,
    participant.pendingAction?.executionEvent.time,
    $animatedCurrentTime
  );

  function getActionCompletionPercentage(startTime: Date | undefined, endTime: Date | undefined, currentTime: Date): number | undefined {
    if (!startTime || !endTime) {
      return;
    }
    const totalTimeInMilliseconds = differenceInMilliseconds(endTime, startTime);
    if (totalTimeInMilliseconds === 0) {
      return 100;
    }
    return (100 * differenceInMilliseconds(currentTime, startTime)) / totalTimeInMilliseconds;
  }
</script>

<div>
  <div class={style} on:click={onClick}>
    <CharacterAvatarView character={participant}>
      <div
        slot="overlay"
        class="absolute bg-red-700/50 bottom-0 left-0 right-0"
        style={`height: ${participant.lostPercentageOfHealth}%;`}
      />
    </CharacterAvatarView>
  </div>
  <div class="relative h-[9px] border-[2px] border-black mt-[3px]">
    <div class="absolute bg-gray-500 bottom-0 left-0 top-0" style={`width: ${actionCompletionPercentage}%;`} />
  </div>
</div>
