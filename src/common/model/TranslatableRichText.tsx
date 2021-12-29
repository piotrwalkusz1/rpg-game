import { ReactElement } from 'react';
import { TFunction } from 'react-i18next';

export class TranslatableRichText {
  constructor(readonly getReactElement: ({}: { t: TFunction<'translation', undefined> }) => ReactElement) {}

  static fromText(text: string): TranslatableRichText {
    return new TranslatableRichText(() => <>{text}</>);
  }

  static fromTranslationKey(translationKey: string): TranslatableRichText {
    return new TranslatableRichText(({ t }) => <>{t(translationKey)}</>);
  }

  static fromArray(translatableRichTexts: Array<TranslatableRichText>): TranslatableRichText {
    return new TranslatableRichText(({ t }) => (
      <>
        {translatableRichTexts.map((translatableRichText, index) => (
          <span key={index}>
            {index !== 0 ? ' ' : ''}
            {translatableRichText.getReactElement({ t })}
          </span>
        ))}
      </>
    ));
  }
}
