import {Box, BoxProps, Skeleton, Theme} from '@mui/material'
import * as React from 'react'
import {forwardRef} from 'react'

interface Props extends BoxProps {
  bold?: boolean
  italic?: boolean
  gutterBottom?: boolean
  block?: boolean
  skeleton?: boolean | number | string
  size?: 'big' | 'title' | 'small'
  color?: 'primary' | 'secondary' | 'disabled' | 'hint' | 'default' | 'error'
  uppercase?: boolean
  truncate?: boolean,
  noWrap?: boolean
  link?: boolean
}

export const Txt = forwardRef(({
  skeleton,
  children,
  gutterBottom,
  block,
  bold,
  size,
  link,
  italic,
  color,
  uppercase,
  truncate,
  noWrap,
  sx,
  ...otherProps
}: Props, ref: any) => {
  return (
    <Box
      sx={{
        display: 'inline',
        lineHeight: '1.5',
        ...size && ({
          title: {
            fontSize: '1.30em',
          },
          big: {
            fontSize: '1.10em',
          },
          small: {
            fontSize: '0.90em',
          },
        })[size],
        ...color && ({
          primary: {
            color: (t: Theme) => t.palette.primary.main,
          },
          secondary: {
            color: (t: Theme) => t.palette.secondary.main,
          },
          disabled: {
            color: (t: Theme) => t.palette.text.disabled,
          },
          hint: {
            color: (t: Theme) => t.palette.text.secondary,
          },
          error: {
            color: (t: Theme) => t.palette.error.main,
          },
          default: {
            color: (t: Theme) => t.palette.text.primary,
          },
        })[color],
        ...block && {
          display: 'block',
        },
        ...bold && {
          fontWeight: t => t.typography.fontWeightMedium,
        },
        ...italic && {
          fontStyle: 'italic',
        },
        ...gutterBottom && {
          mb: 1,
        },
        ...link && {
          color: t => t.palette.primary.main,
        },
        ...uppercase && {
          textTransform: 'uppercase' as any,
        },
        ...noWrap && {
          whiteSpace: 'nowrap' as any,
        },
        ...truncate && {
          whiteSpace: 'nowrap' as any,
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        },
        ...sx,
      }}
      {...otherProps}
      ref={ref}
    >
      {skeleton ? (
        <Skeleton sx={{display: 'inline-block'}} width={isNaN(skeleton as any) ? '80%' : skeleton as number}/>
      ) : (
        children
      )}
    </Box>
  )
})
