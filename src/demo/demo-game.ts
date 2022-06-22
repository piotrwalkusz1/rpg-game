import type { CDIContainer } from 'cdi-container';
import { Field, rootField, subFieldAt } from 'engine/core/field';
import type { GameEngine } from 'engine/core/game';
import { SimpleScript } from 'engine/core/script/simple-script';
import { Character } from 'engine/modules/character';
import { InformInteraction } from 'engine/modules/information';
import { Informations } from 'engine/modules/information-extensions';
import { InteractionScriptStep } from 'engine/modules/interaction';
import { SpeakInteraction } from 'engine/modules/speaking';
import { AddInformationAfterTalkEventListener } from 'frontend/event-listeners/add-information-after-talk-event-listener';
import {
  addNarrationProvider,
  CharacterNarrationContext,
  NarrationOption,
  NarrationProvider,
  NarrationProviderParams,
  ScriptNarrationOption
} from 'frontend/narration';
import { getPlayer } from 'game';
import { isLiteral } from 'i18n/translatable-text';
import { GameBuilder } from '../game/game-builder';

class Custom001NarrationProvider extends NarrationProvider {
  constructor(private character: Character, private field: Field) {
    super();
  }

  override getNarrationOptions({ context, engine }: NarrationProviderParams): NarrationOption[] {
    if (context instanceof CharacterNarrationContext) {
      const character = context.character;
      if (
        character === this.character &&
        getPlayer(engine).informationOwner.hasInformation(
          new Informations.HasInformation(this.character.informationOwner, new Informations.FieldLocation(this.field))
        ) &&
        !getPlayer(engine).informationOwner.hasInformation(new Informations.FieldLocation(this.field))
      ) {
        return [
          new ScriptNarrationOption({
            image: '/images/ui/speech-bubble.png',
            name: 'DIALOGUE.00001_WHERE_IS_BURIED_TREASURE',
            script: new SimpleScript([
              new InteractionScriptStep(
                character,
                new SpeakInteraction({
                  receivers: [getPlayer(engine)],
                  content: 'DIALOGUE.00002_I_WILL_TELL_YOU_WHERE_TREASURE_IS_BURIED',
                  quote: true
                })
              ),
              new InteractionScriptStep(
                character,
                new InformInteraction({
                  informationReceiver: getPlayer(engine).informationOwner,
                  information: new Informations.FieldLocation(this.field)
                })
              )
            ])
          })
        ];
      }
    }
    return [];
  }
}

export const initializeDemoGame = (container: CDIContainer): GameEngine => {
  const engine: GameEngine = container
    .get(GameBuilder)
    .addCharacter({ name: 'Sestia', avatar: '/images/characters/002_Sestia.png', position: [0, 0] })
    .build();

  const character = engine.getComponents(Character).filter((character) => isLiteral(character.name, 'Sestia'))[0];
  const field = subFieldAt(rootField(engine), [0, 1]);

  const information = new Informations.FieldLocation(field);
  character.informationOwner.addInformation(information);
  character.addEventListener(
    new AddInformationAfterTalkEventListener(new Informations.HasInformation(character.informationOwner, information))
  );
  addNarrationProvider(character, new Custom001NarrationProvider(character, field));

  return engine;
};
