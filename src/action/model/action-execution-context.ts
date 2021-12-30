import type { MapField } from '../../map/model/map-field';
import type { ActionContext } from './action-context';

export class ActionExecutionContext {
  constructor(
    readonly doNotTakeAction: () => void,
    readonly changeActionContext: (actionContext: ActionContext) => void,
    readonly go: (field: MapField) => void
  ) {}
}
