import { EntityProvider } from 'engine/core/ecs';
import type { NarrationProvider } from './narration-provider';
import { NarrationProviderContainer } from './narration-provider-container';

export const addNarrationProvider = (entity: EntityProvider, narrationProvider: NarrationProvider): void => {
  EntityProvider.getEntity(entity)
    .getOrAddComponent(NarrationProviderContainer, () => new NarrationProviderContainer())
    .addNarrationProvider(narrationProvider);
};
