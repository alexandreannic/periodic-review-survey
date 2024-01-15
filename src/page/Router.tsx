import {Form} from './Form/Form'
import {Route, Routes} from 'react-router-dom'
import {useI18n} from '../core/i18n'
import {Dashboard_2} from './Dashboard/Dashboard_2'
import {Dashboard} from './Dashboard/Dashboard'


export const Router = () => {
  const {m} = useI18n()
  return (
    <div>
      <Routes>
        <Route path="/" element={<Form/>}/>
        <Route path="/dashboard2" element={<Dashboard_2/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}
