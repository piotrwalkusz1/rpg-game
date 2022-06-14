<script lang="ts">
  import { bookmarks } from 'frontend/store';
  import BookmarkView from './bookmark-view.svelte';
</script>

<div class="flex items-center h-full">
  {#each $bookmarks as bookmark}
    <div class="ml-[10px]">
      <BookmarkView {bookmark} />
    </div>
  {/each}
</div>
