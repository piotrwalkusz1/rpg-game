import { Component } from 'engine/core/ecs';
import type { PendingAction } from '.';

export class ActionExecutor extends Component {
  pendingAction: PendingAction | undefined;
}
