import React from 'react'
import {Box, Grid} from '@mui/material'
import {Form} from './Form/Form'
import {formArea, formOutcome} from './Form/formData'
import {useI18n} from './core/i18n'
import {ScRadioGroup, ScRadioGroupItem} from './shared/RadioGroup'

const Flag = ({code}: {code: string}) => {
  return (
    <img
      loading="lazy"
      width="20"
      src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w40/${code.toLowerCase()}.png 2x`}
      alt=""
    />
  )
}

function App() {
  const {m, setLang, currentLang} = useI18n()
  return (
    <Box component="main" sx={{
      mx: 'auto',
      maxWidth: 680,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      pt: 3,
      pb: 2,
      px: 2,
    }}>
      <Box sx={{
        flex: 1,
      }}>
        <Form formOutcome={formOutcome(m)} formArea={formArea(m)}/>
      </Box>
      
      <Box component="footer" sx={{
        borderTop: t => `1px solid ${t.palette.divider}`,
        pt: 3,
        mt: 7,
        color: t => t.palette.text.disabled
      }}>
        <Grid container alignItems="center" justifyContent={'space-between'}>
          <Grid sm={6} item sx={{my: 1}}>© 2023&nbsp;<b>DRC</b>&nbsp;Danish Refugee Council</Grid>
          <Grid sm={6} item sx={{display: 'flex'}}>
            <ScRadioGroup onChange={setLang} value={currentLang} inline dense sx={{whiteSpace: 'nowrap', marginLeft: 'auto', color: t => t.palette.text.secondary}}>
              <ScRadioGroupItem
                sx={{height: 37}}
                value="en"
                title={
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Flag code="GB"/>&nbsp;&nbsp;English
                  </Box>
                }/>
              <ScRadioGroupItem
                sx={{height: 37}}
                value="ua"
                title={
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Flag code="UA"/>&nbsp;&nbsp;Українська
                  </Box>
                }/>
            </ScRadioGroup>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default App;
