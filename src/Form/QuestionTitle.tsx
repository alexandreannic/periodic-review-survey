import React from 'react'
import {Box, BoxProps} from '@mui/material'

export const QuestionTitle = (props: Omit<BoxProps, 'component'>) => {
  return (
    <Box {...props} component="h1" sx={{...props.sx, fontSize: '1.9rem'}}/>
  )
}
