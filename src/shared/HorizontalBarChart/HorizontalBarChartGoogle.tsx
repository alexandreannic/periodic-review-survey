import * as React from 'react'
import {ReactNode, useMemo, useState} from 'react'
import {alpha, Box, styled, Tooltip} from '@mui/material'
import {useTimeout} from '@alexandreannic/react-hooks-lib'
import {makeSx, Txt} from 'mui-extension'
import {useI18n} from '../../core/i18n'

export interface HorizontalBarChartGoogleData {
  label: ReactNode
  value: number
  color?: string
  disabled?: boolean
}

interface Props {
  data?: HorizontalBarChartGoogleData[]
  barHeight?: number
}

const sx = makeSx({
  label: {
    flex: 1,
    p: 0,
    pr: 2,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
})

export const HorizontalBarChartGoogle = ({
  data,
  barHeight = 4
}: Props) => {
  const {m} = useI18n()
  const maxValue = useMemo(() => data && Math.max(...data.map(_ => _.value)), [data])
  const sumValue = useMemo(() => data && data.reduce((sum, _) => _.value + sum, 0), [data])
  const [appeared, setAppeared] = useState<boolean>(false)
  const {formatLargeNumber} = useI18n()
  
  useTimeout(() => setAppeared(true), 200)

  return (
    <Box sx={{overflow: 'hidden'}}>
      {data && maxValue && sumValue ? (
        data.map((item, i) => {
          const percentOfMax = (item.value / maxValue) * 100
          const percentOfAll = (item.value / sumValue) * 100
          return (
            <LightTooltip
              open={item.disabled ? false : undefined}
              title={
                <>
                  <Txt size="big" block bold>
                    {item.label}
                  </Txt>
                  <div>
                    <Txt size="title" color="primary" block>
                      {formatLargeNumber(item.value)}
                    </Txt>
                    <Txt size="big" color="hint" block>
                      {Math.ceil(percentOfAll)}%
                    </Txt>
                  </div>
                </>
              }
            >
              <Box key={i} sx={{
                my: 1,
                mx: 0,
                ...item.disabled ? {
                  mb: -2,
                  mt: 3,
                } : {
                  borderBottom: i === data.length - 1 ? 'none' : t => `1px solid ${t.palette.divider}`,
                  transition: t => t.transitions.create('background'),
                  '&:hover': {
                    background: t => alpha(t.palette.primary.main, 0.1),
                  }
                }
              }}>
                <Box sx={{display: 'flex', mb: barHeight + 'px', py: .5}}>
                  <Box sx={sx.label}>
                    {item.label}
                  </Box>
                  {!item.disabled && (
                    <Box sx={{display: 'flex', textAlign: 'right',}}>
                      <Txt color="hint">{formatLargeNumber(item.value)}</Txt>
                      <Box sx={{
                        minWidth: 110,
                        color: t => t.palette.primary.main,
                        fontWeight: t => t.typography.fontWeightBold,
                      }}>{percentOfMax.toFixed(1)}%</Box>
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    transition: t => t.transitions.create('width', {duration: 1200}),
                    width: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    borderBottom: t => `${barHeight}px solid ${t.palette.primary.main}`,
                  }}
                  style={{width: appeared ? `calc(${percentOfMax * 0.9}%)` : 0, color: item.color, borderColor: item.color}}
                />
              </Box>
            </LightTooltip>
          )
        })
      ) : (
        <Box sx={sx.label}> {m.noDataAtm} </Box>
      )}
    </Box>
  )
}

const ToBeStyledTooltip = ({className, ...props}: any) => (
  <Tooltip {...props} classes={{tooltip: className}}/>
)

const LightTooltip = styled(ToBeStyledTooltip)(({theme}) => ({
  backgroundColor: theme.palette.common.white,
  color: 'rgba(0, 0, 0, 0.87)',
  boxShadow: theme.shadows[1],
  fontSize: 11,
}))


// const LightTooltip = styled(Tooltip)((t: Theme) => ({
//   backgroundColor: t.palette.common.white,
//   color: 'rgba(0, 0, 0, 0.87)',
//   boxShadow: t.shadows[1],
//   fontSize: 11,
// }))
