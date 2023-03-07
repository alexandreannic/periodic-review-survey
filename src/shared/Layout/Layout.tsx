import {Box, BoxProps, Grid} from '@mui/material'
import {Txt} from 'mui-extension'
import {NavLink} from 'react-router-dom'
import {ScRadioGroup, ScRadioGroupItem} from '../RadioGroup'
import React, {useEffect} from 'react'
import {useI18n} from '../../core/i18n'

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

export const Layout = ({
  width = 680,
  children,
  sx,
  ...props
}: BoxProps & {width?: number}) => {
  const {m, setLang, currentLang} = useI18n()
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])
  return (
    <Box sx={sx}>
      <Box component="main" sx={{
        mx: 'auto',
        maxWidth: width,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        pt: 3,
        pb: 2,
        px: 2,
      }} {...props}>
        <Box sx={{
          flex: 1,
        }}>
          {children}
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
              <NavLink to="/"><Txt link>Home</Txt></NavLink>
              &nbsp;•&nbsp;
              <NavLink to="/dashboard"><Txt link>{m.seeResults}</Txt></NavLink>
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
    </Box>
  )
}
