import type { PendingAction } from 'engine/core/action';
import { Component } from 'engine/core/ecs';

export class ActionExecutor extends Component {
  pendingAction: PendingAction | undefined;
}
