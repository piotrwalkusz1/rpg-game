import { writable } from 'svelte/store';
import { MockedGame } from '../game/mock/mocked-game';

export const gameState = writable(MockedGame.createGameState());
