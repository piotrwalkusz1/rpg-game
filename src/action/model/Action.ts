import { ActionExecutionContext } from './ActionExecutionContext';

export class Action {
  constructor(
    readonly id: string,
    readonly order: number,
    readonly executeAction: (actionExecutionContext: ActionExecutionContext) => void
  ) {}

  getNameTranslationKey(): string {
    return 'ACTION.ACTION_TYPE.' + this.id;
  }
}
