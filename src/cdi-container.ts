import { ActionService, ActionSystem } from 'engine/core/action';
import { ActivityService, ActivitySystem } from 'engine/core/activity';
import { AISystem } from 'engine/core/ai';
import { CommandService, CommandSystem } from 'engine/core/command';
import { ConditionChecker, ConditionService } from 'engine/core/condition';
import { EntityEventListenerExecutor } from 'engine/core/ecs';
import { AreFieldsConnectedChecker } from 'engine/core/field/are-fields-connected-checker';
import { GameSystem } from 'engine/core/game';
import { ScriptService, ScriptStepExecutor } from 'engine/core/script';
import { IsAliveChecker } from 'engine/modules/health/is-alive-checker';
import { HasInformationChecker } from 'engine/modules/information/has-information-checker';
import { InformInteractionExecutor } from 'engine/modules/information/inform-interaction-executor';
import { InformationService } from 'engine/modules/information/information-service';
import { InteractionExecutor, InteractionScriptStepExecutor, InteractionService } from 'engine/modules/interaction';
import { JournalSpeakingSystem } from 'engine/modules/journal-extensions/journal-speaking';
import { TalkJournalSystem } from 'engine/modules/journal-extensions/journal-talk';
import { MovementSystem } from 'engine/modules/movement';
import { OfferService } from 'engine/modules/offer';
import { SpeakInteractionExecutor } from 'engine/modules/speaking/speak-interaction-executor';
import { TalkSystem } from 'engine/modules/talk';
import { TalkService } from 'engine/modules/talk/talk-service';
import { BookmarkProvider, BookmarkService, DialogBookmarkProvider } from 'frontend/bookmark';
import { AddInformationAfterTalkEventListenerExecutor } from 'frontend/event-listeners/add-information-after-talk-event-listener-executor';
import {
  CharacterNarrationOptionExecutor,
  CharacterNarrationProvider,
  CommandNarrationOptionExecutor,
  CustomChracterNarrationProvider,
  MovementNarrationProvider,
  NarrationOptionExecutor,
  NarrationProvider,
  NarrationService,
  ScriptNarrationOptionExecutor,
  TalkNarrationOptionExecutor,
  TalkNarrationProvider
} from 'frontend/narration';
import { GameStoreService } from 'frontend/store/game-store-service';
import { GameBuilder } from 'game';
import { isAssignableTo, Type } from 'utils';

class Instance<T> {
  private value: T | undefined = undefined;

  constructor(public type: Type<T>, private compute: () => T, private singleton: boolean) {}

  get(): T {
    if (!this.singleton) {
      return this.compute();
    }
    if (!this.value) {
      this.value = this.compute();
    }
    return this.value;
  }
}

export class CDIContainer {
  private _instances: Instance<unknown>[] = [];

  static default(): CDIContainer {
    const container = new CDIContainer();
    container.singleton(BookmarkService, (cdi) => new BookmarkService(cdi.getAll(BookmarkProvider)));
    container.singleton(
      NarrationService,
      (cdi) => new NarrationService(cdi.getAll(NarrationProvider), cdi.getAll(NarrationOptionExecutor))
    );
    container.singleton(ConditionService, (cdi) => new ConditionService(cdi.getAll(ConditionChecker)));
    container.singleton(ActionService, (cdi) => new ActionService(cdi.get(ConditionService)));
    container.singleton(GameStoreService, (cdi) => new GameStoreService(cdi.get(BookmarkService), cdi.get(NarrationService)));
    container.singleton(OfferService, () => new OfferService());
    container.singleton(ActivityService, () => new ActivityService());
    container.singleton(ScriptService, (cdi) => new ScriptService(cdi.getAll(ScriptStepExecutor)));
    container.singleton(TalkService, (cdi) => new TalkService(cdi.get(OfferService), cdi.get(ActivityService)));
    container.singleton(CommandService, (cdi) => new CommandService(cdi.get(ActionService)));
    container.singleton(InteractionService, (cdi) => new InteractionService(cdi.getAll(InteractionExecutor)));
    container.singleton(InformationService, (cdi) => new InformationService(cdi.get(InteractionService)));
    container.dependent(GameBuilder, (cdi) => new GameBuilder(cdi.getAll(GameSystem), cdi.getAll(EntityEventListenerExecutor)));

    // EntityEventListenerExecutor
    container.singleton(AddInformationAfterTalkEventListenerExecutor, () => new AddInformationAfterTalkEventListenerExecutor());

    // BookmarkProvider
    container.singleton(DialogBookmarkProvider, () => new DialogBookmarkProvider());

    // NarrationProvider
    container.singleton(TalkNarrationProvider, (cdi) => new TalkNarrationProvider(cdi.get(TalkService)));
    container.singleton(MovementNarrationProvider, (cdi) => new MovementNarrationProvider(cdi.get(ActionService)));
    container.singleton(CharacterNarrationProvider, () => new CharacterNarrationProvider());
    container.singleton(CustomChracterNarrationProvider, () => new CustomChracterNarrationProvider());

    // NarrationOptionExecutor
    container.singleton(TalkNarrationOptionExecutor, (cdi) => new TalkNarrationOptionExecutor(cdi.get(TalkService)));
    container.singleton(CommandNarrationOptionExecutor, (cdi) => new CommandNarrationOptionExecutor(cdi.get(CommandService)));
    container.singleton(CharacterNarrationOptionExecutor, () => new CharacterNarrationOptionExecutor());
    container.singleton(ScriptNarrationOptionExecutor, (cdi) => new ScriptNarrationOptionExecutor(cdi.get(ScriptService)));

    // ConditionChecker
    container.singleton(IsAliveChecker, () => new IsAliveChecker());
    container.singleton(HasInformationChecker, () => new HasInformationChecker());
    container.singleton(AreFieldsConnectedChecker, () => new AreFieldsConnectedChecker());

    // InteractionExecutor
    container.singleton(SpeakInteractionExecutor, () => new SpeakInteractionExecutor());
    container.singleton(InformInteractionExecutor, () => new InformInteractionExecutor());

    // ScriptStepExecutor
    container.singleton(InteractionScriptStepExecutor, (cdi) => new InteractionScriptStepExecutor(cdi.get(InteractionService)));

    // GameSystem
    container.singleton(ActionSystem, (cdi) => new ActionSystem(cdi.get(ActionService)));
    container.singleton(ActivitySystem, (cdi) => new ActivitySystem(cdi.get(ActivityService)));
    container.singleton(CommandSystem, (cdi) => new CommandSystem(cdi.get(CommandService)));
    container.singleton(MovementSystem, () => new MovementSystem());
    container.singleton(JournalSpeakingSystem, () => new JournalSpeakingSystem());
    container.singleton(TalkJournalSystem, () => new TalkJournalSystem());
    container.singleton(TalkSystem, (cdi) => new TalkSystem(cdi.get(TalkService)));
    container.singleton(AISystem, (cdi) => new AISystem(cdi.get(OfferService)));

    return container;
  }

  get<T>(type: Type<T>): T {
    const instances = this.getAll(type);
    if (instances.length === 1) {
      return instances[0];
    }
    throw new Error('Expected 1 instance of ' + type.name + ' but was ' + instances.length);
  }

  getAll<T>(type: Type<T>): T[] {
    return this._instances.filter((instance) => isAssignableTo(instance.type, type)).map((instance) => instance.get() as T);
  }

  singleton<T>(type: Type<T>, instanceProvider: (cdi: CDIContainer) => T): void {
    this._instances.push(new Instance(type, () => instanceProvider(this), true));
  }

  dependent<T>(type: Type<T>, instanceProvider: (cdi: CDIContainer) => T): void {
    this._instances.push(new Instance(type, () => instanceProvider(this), false));
  }
}
