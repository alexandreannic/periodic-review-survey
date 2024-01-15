import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {appConfig} from './conf/AppConfig'
import {Provide} from './core/Provide'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {muiTheme} from './core/theme'
import {I18nProvider} from './core/i18n'
import {StoreProvider} from './core/context/StoreContext'
import {ToastProvider} from 'mui-extension'
import {FirebaseDb} from './core/firebaseDb/FirebaseDb'
import {FirebaseDbProvider} from './core/firebaseDb/FirebaseDbContext'
import {HashRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const firebaseDb = new FirebaseDb(appConfig)

root.render(
  <Provide providers={[
    _ => <ThemeProvider theme={muiTheme()} children={_}/>,
    _ => <CssBaseline children={_}/>,
    _ => <I18nProvider children={_}/>,
    _ => <StoreProvider children={_}/>,
    _ => <ToastProvider children={_}/>,
    _ => <FirebaseDbProvider children={_} db={firebaseDb}/>,
    _ => <HashRouter children={_}/>
  ]}>
    <App/>
  </Provide>
)
