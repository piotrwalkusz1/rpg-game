import { writable } from 'svelte/store';
import { MockedGame } from '../game/service/mocked-game';
import { MotionUtils } from './motion-utils';
import { TimeUtils } from './time-utils';

const initialGameState = MockedGame.createGameState();

export const gameState = writable(initialGameState);

export const animatedCurrentTime = MotionUtils.interpolate(initialGameState.currentTime, TimeUtils.interpolate);
