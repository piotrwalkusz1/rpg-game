import { ReactElement } from 'react';
import { TFunction, Trans } from 'react-i18next';
import { TranslatableRichTextView } from '../component/TranslatableRichTextView';

export class TranslatableRichText {
  constructor(readonly getReactElement: ({}: { t: TFunction<'translation', undefined> }) => ReactElement) {}

  static fromText(text: string): TranslatableRichText {
    return new TranslatableRichText(() => <>{text}</>);
  }

  static fromTranslationKey(translationKey: string, values?: { [key: string]: string | TranslatableRichText }): TranslatableRichText {
    const components: { [key: string]: ReactElement } = {};
    if (values) {
      Object.entries(values).forEach(([key, value]) => {
        if (value instanceof TranslatableRichText) {
          components[key] = <TranslatableRichTextView text={value}></TranslatableRichTextView>;
        }
      });
    }
    if (Object.keys(components).length !== 0) {
      return new TranslatableRichText(() => {
        return <Trans i18nKey={translationKey} values={values} components={components} />;
      });
    } else {
      return new TranslatableRichText(({ t }) => <>{t(translationKey, values)}</>);
    }
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
