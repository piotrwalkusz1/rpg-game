import { Action } from './Action';
import { TranslatableRichText } from '../../common/model/TranslatableRichText';
import { ActionContextDescription } from './ActionConctextDescription';

export class ActionContext {
  constructor(
    readonly title: TranslatableRichText,
    readonly description: ActionContextDescription,
    readonly isActionRequired: boolean,
    readonly actions: Array<Action>
  ) {}
}
