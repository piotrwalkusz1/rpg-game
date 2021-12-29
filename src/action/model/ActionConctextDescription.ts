import { Character } from '../../character/model/Character';
import { TranslatableRichText } from '../../common/model/TranslatableRichText';

export class ActionContextDescription {
  constructor(readonly text: TranslatableRichText, readonly character?: Character) {}
}
