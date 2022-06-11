import type { PendingAction } from 'engine/core/action';
import type { Command, CommandExecutor } from 'engine/core/command';
import { Component, Engine } from 'engine/core/ecs';
import type { Field } from 'engine/core/field';
import type { Character } from 'engine/modules/character';
import type { Talker } from 'engine/modules/talk/talker';

export class Player extends Component {
  readonly character: Character;

  constructor({ character }: { character: Character }) {
    super();
    this.character = character;
  }

  get talker(): Talker {
    return this.character.talker;
  }

  get commandExecutor(): CommandExecutor {
    return this.character.commandExecutor;
  }

  get field(): Field | undefined {
    return this.character.fieldObject.field;
  }

  set field(field: Field | undefined) {
    this.character.fieldObject.field = field;
  }

  get pendingAction(): PendingAction | undefined {
    return this.character.pendingAction;
  }

  set pendingAction(pendingAction: PendingAction | undefined) {
    this.character.pendingAction = pendingAction;
  }

  get pendingCommand(): Command | undefined {
    return this.character.pendingCommand;
  }

  set pendingCommand(pendingCommand: Command | undefined) {
    this.character.pendingCommand = pendingCommand;
  }
}

export const getPlayer = (engine: Engine): Player => {
  return engine.requireComponent(Player);
};
