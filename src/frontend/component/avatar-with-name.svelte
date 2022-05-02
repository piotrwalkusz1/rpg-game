<script lang="ts">
  import Avatar from 'frontend/component/avatar.svelte';
  import DisplayedName from 'frontend/component/displayed-name.svelte';

  export let avatar: string;
  export let name: string;
</script>

<div class="flex">
  <Avatar image={avatar} />
  <div class="pl-[6px]">
    <DisplayedName value={name} />
  </div>
</div>
