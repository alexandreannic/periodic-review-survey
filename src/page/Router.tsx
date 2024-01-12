import {Form} from './Form/Form'
import {Route, Routes} from 'react-router-dom'
import {useI18n} from '../core/i18n'
import {Dashboard} from './Dashboard/Dashboard'
import {Dashboard2} from './Dashboard/Dashboard2'


export const Router = () => {
  const {m} = useI18n()
  return (
    <div>
      <Routes>
        <Route path="/" element={<Form/>}/>
        <Route path="/dashboard2" element={<Dashboard/>}/>
        <Route path="/dashboard" element={<Dashboard2/>}/>
      </Routes>
    </div>
  )
}
