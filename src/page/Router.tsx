import {Form} from './Form/Form'
import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {useI18n} from '../core/i18n'
import {Dashboard} from './Dashboard/Dashboard'


export const Router = () => {
  const {m} = useI18n()
  return (
    <div>
      <Routes>
        <Route path="/" element={<Form/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}
