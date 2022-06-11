import type { PendingAction } from 'engine/core/action';
import type { Command, CommandExecutor } from 'engine/core/command';
import { Component, Engine } from 'engine/core/ecs';
import type { Field } from 'engine/core/field';
import { Character } from 'engine/modules/character';
import { JournalOwner } from 'engine/modules/journal';
import type { Talker } from 'engine/modules/talk/talker';

export class Player extends Component {
  readonly character: Character;
  readonly journalOwner: JournalOwner;

  constructor({ character, journalOwner }: { character: Character; journalOwner: JournalOwner }) {
    super();
    this.character = character;
    this.journalOwner = journalOwner;
  }

  static create(engine: Engine): Player {
    const character = Character.create(engine);
    const journalOwner = new JournalOwner();
    const player = new Player({ character, journalOwner });
    character.requireEntity().addComponents([journalOwner, player]);
    return player;
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
