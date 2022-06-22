import { Script } from './script';
import type { ScriptStep } from './script-step';

export class SimpleScript extends Script {
  constructor(readonly steps: ScriptStep[]) {
    super();
  }
}
