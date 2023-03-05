import {Form} from './Form/Form'
import {Route, Routes} from 'react-router-dom'
import {formArea, formOutcome} from './Form/formData'
import React from 'react'
import {useI18n} from '../core/i18n'
import {Dashboard} from './Dashboard/Dashboard'


export const Router = () => {
  const {m} = useI18n()
  return (
    <div>
      <Routes>
        <Route path="/" element={<Form formOutcome={formOutcome(m)} formArea={formArea(m)}/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}
