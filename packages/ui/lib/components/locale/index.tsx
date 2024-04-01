import { enGB, fr, ja, Locale } from 'date-fns/locale';
import React from 'react';
import { IntlProvider } from 'react-intl';

interface LocaleContextValue {
  locale: string;
  dateLocale?: Locale;
  changeLocale: (locale: string) => void;
}

const LocaleContext = React.createContext<LocaleContextValue>({
  locale: 'en',
  changeLocale: () => null,
});

interface LocaleProviderProps {
  children: React.ReactNode;
  locale?: string;
}

function LocaleProvider({ children, locale: localeProp = 'en' }: LocaleProviderProps) {
  const [locale, setLocale] = React.useState(
    localStorage.getItem('briks-locale') ?? localeProp ?? 'en',
  );

  const changeLocale = (locale: string) => {
    setLocale(locale);
    localStorage.setItem('briks-locale', locale);
  };

  const dateLocale = React.useMemo(() => {
    switch (locale) {
      case 'fr':
        return fr;
      case 'ja':
        return ja;
      default:
        return enGB;
    }
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>{children}</LocaleContext.Provider>
  );
}

function useLocale() {
  return React.useContext(LocaleContext);
}

const withLocalization = (Component: React.ComponentType<any>) => (props: any) => {
  const { locale } = useLocale();
  const [messages, setMessages] = React.useState(null);

  // Load messages asynchronously
  React.useEffect(() => {
    import(`../../translations/translations.${locale}.json`).then(messages => {
      setMessages(messages);
    });
  }, [locale]);

  if (!messages) {
    throw new Error(`Missing translations for ${locale}`);
  }

  return (
    <IntlProvider locale={locale} defaultLocale='en' messages={messages}>
      <Component {...props} />
    </IntlProvider>
  );
};

export { LocaleProvider, useLocale, withLocalization };
