import React from 'react'
import {Box, Grid} from '@mui/material'
import {useI18n} from './core/i18n'
import {ScRadioGroup, ScRadioGroupItem} from './shared/RadioGroup'
import {Router} from './page/Router'
import {Txt} from 'mui-extension'
import {NavLink} from 'react-router-dom'

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
        <Router/>
      </Box>
      
      <Box component="footer" sx={{
        borderTop: t => `1px solid ${t.palette.divider}`,
        pt: 3,
        mt: 7,
        color: t => t.palette.text.disabled
      }}>
        <Grid container alignItems="center" justifyContent={'space-between'}>
          <Grid sm={6} item sx={{my: 1}}>
            <Txt block>© 2023&nbsp;<b>DRC</b>&nbsp;Danish Refugee Council</Txt>
            <NavLink to="/dashboard"><Txt link>{m.seeResults}</Txt></NavLink>
            &nbsp;•&nbsp;
            <NavLink to="/"><Txt link>Home</Txt></NavLink>
          </Grid>
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
