<script lang="ts">
  import type { Character } from 'engine/modules/character';
  import type { Journal } from 'engine/modules/journal';
  import { SpeakJournalEntry } from 'engine/modules/journal-speaking';
  import type { Bookmark } from 'frontend/bookmark';
  import { SpeechBookmark } from 'frontend/bookmark/bookmarks/speech-bookmark';
  import { Dialog, DialogSpeech } from 'frontend/dialog';
  import { journal, refreshEngine } from 'frontend/store';
  import { ArrayUtils } from 'utils';
  import BookmarkView from './bookmark-view.svelte';

  $: bookmarks = generateBookmarks($journal);

  function generateBookmarks(journal: Journal): Bookmark[] {
    const entriesByCharacters = new Map<Character, SpeakJournalEntry[]>();
    for (const entry of ArrayUtils.filterInstanceOf(journal.unreadEntries, SpeakJournalEntry)) {
      const entries = entriesByCharacters.get(entry.speaker);
      if (entries) {
        entries.push(entry);
      } else {
        entriesByCharacters.set(entry.speaker, [entry]);
      }
    }

    const bookmarks: Bookmark[] = [];
    entriesByCharacters.forEach((entries, character) =>
      bookmarks.push(
        new SpeechBookmark({
          dialog: new Dialog({
            character,
            speeches: entries.map((entry) => new DialogSpeech({ character: entry.speaker, content: entry.content })),
            onClose: () => {
              entries.forEach((entry) => (entry.state = 'READ'));
              refreshEngine();
            }
          })
        })
      )
    );

    return bookmarks;
  }
</script>

<div class="flex items-center h-full">
  {#each bookmarks as bookmark}
    <div class="ml-[10px]">
      <BookmarkView {bookmark} />
    </div>
  {/each}
</div>
