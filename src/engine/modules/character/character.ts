import { ActionExecutor, PendingAction } from 'engine/core/action';
import { ActivityParticipant } from 'engine/core/activity';
import { AI } from 'engine/core/ai';
import { Command, CommandExecutor } from 'engine/core/command';
import { Component, Engine, Entity } from 'engine/core/ecs';
import { Field, FieldObject } from 'engine/core/field';
import type { Image } from 'engine/core/resources';
import type { TranslatableText } from 'i18n/translatable-text';
import { Attacker } from '../attack';
import { Health } from '../health';
import { InformationOwner } from '../information';
import { OfferParty } from '../offer';
import { Presentation } from '../presentation';
import { Talker } from '../talk/talker';

export class Character extends Component {
  readonly talker: Talker;
  readonly fieldObject: FieldObject;
  readonly presentation: Presentation;
  readonly commandExecutor: CommandExecutor;
  readonly health: Health;
  readonly attacker: Attacker;
  readonly informationOwner: InformationOwner;

  constructor({
    talker,
    fieldObject,
    presentation,
    commandExecutor,
    health,
    attacker,
    informationOwner
  }: {
    talker: Talker;
    fieldObject: FieldObject;
    presentation: Presentation;
    commandExecutor: CommandExecutor;
    health: Health;
    attacker: Attacker;
    informationOwner: InformationOwner;
  }) {
    super();
    this.talker = talker;
    this.fieldObject = fieldObject;
    this.presentation = presentation;
    this.commandExecutor = commandExecutor;
    this.health = health;
    this.attacker = attacker;
    this.informationOwner = informationOwner;
  }

  static create(engine: Engine, params?: { withAI?: boolean; field?: Field }): Character {
    const offerParty = new OfferParty();
    const activityParticipant = new ActivityParticipant();
    const fieldObject = new FieldObject({ field: params?.field });
    const health = new Health();
    const attacker = new Attacker();
    const actionExecutor = new ActionExecutor();
    const commandExecutor = new CommandExecutor({ actionExecutor });
    const presentation = new Presentation({ name: { literal: '' }, avatar: '/images/characters/001_Eladin.png' });
    const talker = new Talker({ offerParty, activityParticipant, fieldObject });
    const informationOwner = new InformationOwner();
    const character = new Character({
      talker,
      fieldObject,
      presentation,
      commandExecutor,
      health,
      attacker,
      informationOwner
    });
    engine.addEntity(
      new Entity().addComponents([
        attacker,
        offerParty,
        activityParticipant,
        fieldObject,
        health,
        actionExecutor,
        commandExecutor,
        presentation,
        talker,
        character,
        informationOwner
      ])
    );
    if (params?.withAI) {
      character.entity.addComponent(new AI({ character }));
    }
    return character;
  }

  get actionExecutor(): ActionExecutor {
    return this.commandExecutor.actionExecutor;
  }

  get activityParticipant(): ActivityParticipant {
    return this.talker.activityParticipant;
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

  get pendingCommand(): Command | undefined {
    return this.commandExecutor.pendingCommand;
  }
}
