import type { Information } from './information';

export interface InformationOwner {
  get informations(): Information[];
}
