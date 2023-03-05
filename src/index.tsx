import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {initializeApp} from 'firebase/app'
import {getAnalytics} from 'firebase/analytics'
import {appConfig, AppConfig} from './conf/AppConfig'
import * as fb from 'firebase/database'
import {Provide} from './core/Provide'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {muiTheme} from './core/theme'
import {I18nProvider} from './core/i18n'
import {StoreProvider} from './core/context/StoreContext'
import {ToastProvider} from 'mui-extension'
import {FirebaseDb} from './core/firebaseDb/FirebaseDb'
import {FirebaseDbProvider} from './core/firebaseDb/FirebaseDbContext'
import {BrowserRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const init = async (conf: AppConfig) => {
  const app = initializeApp(conf.firebase)
  const analytics = getAnalytics(app)
  const db = fb.getDatabase(app)


  await fb.set(fb.ref(db, 'test/' + 1), {
    username: 'alex',
    email: 'email',
  })

  const starCountRef = fb.ref(db, 'test/' + 1)
  fb.onValue(starCountRef, (snapshot) => {
    const data = snapshot.val()
    console.log(data, snapshot)
  })
}

const firebaseDb = new FirebaseDb(appConfig)


root.render(
  <Provide providers={[
    _ => <ThemeProvider theme={muiTheme()} children={_}/>,
    _ => <CssBaseline children={_}/>,
    _ => <I18nProvider children={_}/>,
    _ => <StoreProvider children={_}/>,
    _ => <ToastProvider children={_}/>,
    _ => <FirebaseDbProvider children={_} db={firebaseDb}/>,
    _ => <BrowserRouter children={_}/>
  ]}>
    <App/>
  </Provide>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
