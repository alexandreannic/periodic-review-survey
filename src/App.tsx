import React from 'react'
import {Box} from '@mui/material'
import {Form} from './Form/Form'
import {formArea, formOutcome} from './Form/formData'
import {useI18n} from './core/i18n'

function App() {
  const {m} = useI18n()
  return (
    <Box sx={{
      mt: 2,
      mb: 3,
      mx: 'auto',
      maxWidth: 680,
    }}>
      <Form formOutcome={formOutcome(m)} formArea={formArea(m)}/>
    </Box>
  )
}

export default App;
