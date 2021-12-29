import { useTranslation } from 'react-i18next';
import { TranslatableRichText } from '../model/TranslatableRichText';

export const TranslatableRichTextView = ({ text }: { text: TranslatableRichText }) => {
  const { t } = useTranslation();
  return <>{text.getReactElement({ t })}</>;
};
