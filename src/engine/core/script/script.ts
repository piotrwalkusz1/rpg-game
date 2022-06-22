import type { ScriptStep } from './script-step';

export abstract class Script {
  abstract get steps(): readonly ScriptStep[];
}
