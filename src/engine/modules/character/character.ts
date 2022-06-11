import { ActionExecutor, PendingAction } from 'engine/core/action';
import { ActivityParticipant } from 'engine/core/activity';
import { Command, CommandExecutor } from 'engine/core/command';
import { Component, Engine, Entity } from 'engine/core/ecs';
import { Field, FieldObject } from 'engine/core/field';
import type { Image } from 'engine/core/resources';
import type { TranslatableText } from 'i18n/translatable-text';
import { Health } from '../health';
import { Offer, OfferParty } from '../offer';
import { Presentation } from '../presentation';
import { Talker } from '../talk/talker';

export class Character extends Component {
  readonly talker: Talker;
  readonly fieldObject: FieldObject;
  readonly presentation: Presentation;
  readonly commandExecutor: CommandExecutor;
  readonly health: Health;

  constructor({
    talker,
    fieldObject,
    presentation,
    commandExecutor,
    health
  }: {
    talker: Talker;
    fieldObject: FieldObject;
    presentation: Presentation;
    commandExecutor: CommandExecutor;
    health: Health;
  }) {
    super();
    this.talker = talker;
    this.fieldObject = fieldObject;
    this.presentation = presentation;
    this.commandExecutor = commandExecutor;
    this.health = health;
  }

  static create(engine: Engine): Character {
    const offerParty = new OfferParty();
    const activityParticipant = new ActivityParticipant();
    const fieldObject = new FieldObject();
    const health = new Health();
    const actionExecutor = new ActionExecutor();
    const commandExecutor = new CommandExecutor({ actionExecutor });
    const presentation = new Presentation({ name: { literal: '' }, avatar: '/images/characters/001_Eladin.png' });
    const talker = new Talker({ offerParty, activityParticipant });
    const character = new Character({ talker, fieldObject, presentation, commandExecutor, health });
    engine.addEntity(
      new Entity().addComponents([
        offerParty,
        activityParticipant,
        fieldObject,
        health,
        actionExecutor,
        commandExecutor,
        presentation,
        talker,
        character
      ])
    );
    return character;
  }

  get actionExecutor(): ActionExecutor {
    return this.commandExecutor.actionExecutor;
  }

  get offerParty(): OfferParty {
    return this.offerParty;
  }

  get name(): TranslatableText {
    return this.presentation.name;
  }

  set name(name: TranslatableText) {
    this.presentation.name = name;
  }

  get avatar(): Image {
    return this.presentation.avatar;
  }

  set avatar(avatar: Image) {
    this.presentation.avatar = avatar;
  }

  get field(): Field | undefined {
    return this.fieldObject.field;
  }

  set field(field: Field | undefined) {
    this.fieldObject.field = field;
  }

  get pendingAction(): PendingAction | undefined {
    return this.commandExecutor.pendingAction;
  }

  set pendingAction(pendingAction: PendingAction | undefined) {
    this.commandExecutor.pendingAction = pendingAction;
  }

  get pendingCommand(): Command | undefined {
    return this.commandExecutor.pendingCommand;
  }

  set pendingCommand(pendingCommand: Command | undefined) {
    this.commandExecutor.pendingCommand = pendingCommand;
  }

  get offers(): readonly Offer[] {
    return this.offerParty.offers;
  }
}
