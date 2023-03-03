import React from 'react'
import {Box, Grid} from '@mui/material'
import {Form} from './Form/Form'
import {formArea, formOutcome} from './Form/formData'
import {useI18n} from './core/i18n'
import {ScRadioGroup, ScRadioGroupItem} from './shared/RadioGroup'

function App() {
  const {m} = useI18n()
  return (
    <Box component="main" sx={{
      mx: 'auto',
      maxWidth: 680,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      pt: 2,
      pb: 2,
      px: 2,
    }}>
      <Box sx={{
        flex: 1,
      }}>
        <Form formOutcome={formOutcome(m)} formArea={formArea(m)}/>
      </Box>
      <Box component="footer" sx={{
        mt: 3,
        color: t => t.palette.text.disabled
      }}>
        <Grid container alignItems="center" justifyContent={'space-between'}>
          <Grid sm={6} item sx={{my: 1}}>© 2023&nbsp;<b>DRC</b>&nbsp;Danish Refugee Council</Grid>
          <Grid sm={6} item sx={{display: 'flex'}}>
            <ScRadioGroup inline dense sx={{whiteSpace: 'nowrap', marginLeft: 'auto', color: t => t.palette.text.secondary}}>
              <ScRadioGroupItem sx={{height: 37}} value="en" title="🇬🇧 English"/>
              <ScRadioGroupItem sx={{height: 37}} value="uk" title="🇺🇦 Українська"/>
            </ScRadioGroup>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default App;
