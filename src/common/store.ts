import { writable } from 'svelte/store';
import * as MockedGame from '../game/mock/mocked-game';

export const gameState = writable(MockedGame.mockedGameState);