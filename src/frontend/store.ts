import { writable } from 'svelte/store';
import { MockedGame } from '../demo/mocked-game';
import { MotionUtils } from '../utils/motion-utils';
import { TimeUtils } from '../utils/time-utils';

const initialGameState = MockedGame.createGameState();

export const gameState = writable(initialGameState);

export const animatedCurrentTime = MotionUtils.interpolate(initialGameState.currentTime, TimeUtils.interpolate);
