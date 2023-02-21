import { SerializedStyles } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import ButtonWithIcon from '../ButtonWithIcon';

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
    <ButtonWithIcon
      source='/images/habit-complete.svg'
      altText={t('habit:complete')}
      {...props}
    />
  ) : (
    <ButtonWithIcon
      source='/images/habit-incomplete.svg'
      altText={t('habit:incomplete')}
      {...props}
    />
  );
};

export default CompleteButton;
