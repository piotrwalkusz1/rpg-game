<script lang="ts">
  import CharacterAvatarView from '../../character/component/character-avatar-view.svelte';
  import type { BattleParticipant } from '../model/battle-participant';

  export let participant: BattleParticipant;
</script>

<div class="border-[2px] border-black">
  <CharacterAvatarView character={participant.character} />
</div>
