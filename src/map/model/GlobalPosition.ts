import { LocalPosition } from './LocalPosition';

export class GlobalPosition {
  constructor(readonly positions: Array<LocalPosition>) {}
}
