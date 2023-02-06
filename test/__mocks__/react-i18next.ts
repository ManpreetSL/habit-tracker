const reacti18next: any = jest.createMockFromModule('react-i18next');

reacti18next.useTranslation = () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  });

module.exports = reacti18next;

export default {};
