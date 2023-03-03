import * as React from 'react'
import {ReactNode, useContext, useEffect, useMemo, useState} from 'react'
import {en} from './localization/en'
import {ua} from './localization/ua'

const I18nContext = React.createContext({})

export const appLangs = {
  ua,
  en
}

export type AppLang = keyof typeof appLangs

interface Props {
  readonly defaultLang?: AppLang
  children: ReactNode
}

export interface I18nContextProps {
  currentLang: AppLang
  setLang: (_: AppLang) => void
  m: typeof en['messages']
  availableLangs: AppLang[]
  formatLargeNumber: typeof en['formatLargeNumber']
  formatDuration: typeof en['formatDuration']
  formatDate: typeof en['formatDate']
  dateFromNow: typeof en['dateFromNow']
  formatTime: typeof en['formatTime']
  formatDateTime: typeof en['formatDateTime']
}

export const useI18n = (): I18nContextProps => {
  return useContext<I18nContextProps>(I18nContext as any)
}

export const withI18n = (Component: any) => (props: any) =>
  <I18nContext.Consumer>{(other: any) => <Component {...props} {...other} />}</I18nContext.Consumer>

export const I18nProvider = ({children, defaultLang = 'en'}: Props) => {
  const [lang, setLang] = useState<AppLang>()
  
  useEffect(() => {
    setLang(defaultLang)
  }, [defaultLang])
  
  const {messages: m, ...others}: typeof en = useMemo(() => {
    switch (lang) {
      case 'ua':
        return en
      default:
        return en
    }
  }, [lang])

  return (
    <I18nContext.Provider
      value={{
        currentLang: lang,
        setLang,
        availableLangs: Object.keys(appLangs),
        m,
        ...others,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}
