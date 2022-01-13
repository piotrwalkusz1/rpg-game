import type { GameState } from '../../../game/model/game-state';
import type { NarrationProviderResult } from './narration-provider-result';
import type { NarrationProviderTrigger } from './narration-provider-trigger';

export type NarrationProvider = (args: { trigger: NarrationProviderTrigger; gameState: GameState }) => NarrationProviderResult | undefined;
