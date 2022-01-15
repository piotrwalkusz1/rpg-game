import type { Law } from './law';

export interface LawContext {
  get laws(): Law[];
}
