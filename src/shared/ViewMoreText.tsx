import {Box, BoxProps} from '@mui/material'
import {useState} from 'react'
import {Txt} from 'mui-extension'
import {useI18n} from '../core/i18n'

export const ViewMoreText = ({
  children,
  limit = 240,
  initialOpen,
  ...props
}: {
  initialOpen?: boolean
  children: string
  limit?: number
} & BoxProps) => {
  const [open, setOpen] = useState(initialOpen)
  const {m} = useI18n()

  return (
    <Box {...props}>
      {(open || children.length <= limit) ? children : <>{children.substring(0, limit)}...</>}
      {children.length > limit && <Txt sx={{cursor: 'pointer'}} link bold onClick={() => setOpen(_ => !_)}>&nbsp;{open ? m.viewLess : m.viewMore}</Txt>}
    </Box>
  )
}