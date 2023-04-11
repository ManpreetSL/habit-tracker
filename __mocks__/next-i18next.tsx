export const useTranslation = () => ({
  t: (str: string) => str,
  i18n: {
    changeLanguage: () => new Promise(() => {}),
  },
});

export const Trans = ({ i18nKey }: { i18nKey: string }) => i18nKey;

const i18n = { useTranslation, Trans };

export default i18n;
