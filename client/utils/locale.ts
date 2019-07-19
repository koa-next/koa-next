import locales from '../locales';

export const getLocales = (platLang: string) => {
  return locales[platLang] || {};
};
