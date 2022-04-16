import type { NarrationProvider } from './narration-provider';

export interface NarrationProviderOwner {
  get narrationProviders(): NarrationProvider[];
}
