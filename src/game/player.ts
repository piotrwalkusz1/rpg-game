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
    return this.character.field;
  }

  set field(field: Field | undefined) {
    this.character.field = field;
  }

  get pendingAction(): PendingAction | undefined {
    return this.character.pendingAction;
  }

  get pendingCommand(): Command | undefined {
    return this.character.pendingCommand;
  }
}

export const getPlayer = (engine: Engine): Player => {
  return engine.requireComponent(Player);
};
