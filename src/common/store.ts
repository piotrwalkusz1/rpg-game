import { writable } from 'svelte/store';
import { MockedGame } from '../game/service/mocked-game';

export const gameState = writable(MockedGame.createGameState());
