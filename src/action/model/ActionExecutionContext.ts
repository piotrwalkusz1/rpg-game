import { MapField } from '../../map/model/MapField';
import { ActionContext } from './ActionContext';

export class ActionExecutionContext {
  constructor(
    readonly doNotTakeAction: () => void,
    readonly changeActionContext: (actionContext: ActionContext) => void,
    readonly go: (field: MapField) => void
  ) {}
}
