<script lang="ts">
  import type { Journal } from 'engine/modules/journal';
  import { Bookmark, BookmarkService } from 'frontend/bookmark';
  import { gameStore, journal } from 'frontend/store';
  import BookmarkView from './bookmark-view.svelte';

  $: bookmarks = generateBookmarks($journal);

  function generateBookmarks(journal: Journal): Bookmark[] {
    return BookmarkService.generateBookmarks({ journal, refreshEngine: () => gameStore.refreshEngine() });
  }
</script>

<div class="flex items-center h-full">
  {#each bookmarks as bookmark}
    <div class="ml-[10px]">
      <BookmarkView {bookmark} />
    </div>
  {/each}
</div>
