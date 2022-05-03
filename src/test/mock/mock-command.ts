import { ActionExecutor, type Action } from 'engine/core/action';
import { Command } from 'engine/core/command';
import { MockAction } from './mock-action';

export class MockCommand extends Command {
  

  override getNextAction(): Action | undefined {
    const actionExecutor = this.executor.getComponent(ActionExecutor);
    return actionExecutor ? new MockAction({ executor: actionExecutor }) : undefined;
  }
}
