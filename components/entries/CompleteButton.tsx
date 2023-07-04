import { SerializedStyles } from '@emotion/react';
import { useTranslation } from 'next-i18next';
import ButtonWithImage from '../ButtonWithImage';

type CompleteButtonProps = {
  complete: boolean;
  stylesProp?: SerializedStyles;
  onClick: () => void;
};

const CompleteButton = ({
  complete = false,
  ...props
}: CompleteButtonProps) => {
  const { t } = useTranslation(['common', 'habit']);

  return complete ? (
    <ButtonWithImage
      source='/images/habit-complete.svg'
      altText={t('habit:complete')}
      {...props}
    />
  ) : (
    <ButtonWithImage
      source='/images/habit-incomplete.svg'
      altText={t('habit:incomplete')}
      {...props}
    />
  );
};

export default CompleteButton;
