import { Component } from '../ecs';
import type { Command } from './command';

export class CommandExecutor extends Component {
  pendingCommand: Command | undefined;
}
