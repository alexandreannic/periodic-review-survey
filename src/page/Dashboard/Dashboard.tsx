import {useEffect, useMemo, useState} from 'react'
import {AllBreakthroughOptions, FormAnswer} from '../Form/Form'
import {useFirebaseDbContext} from '../../core/firebaseDb/FirebaseDbContext'
import {HorizontalBarChart} from '../../shared/HorizontalBarChart/HorizontalBarChart'
import {Animate} from '../../shared/Animate'
import {Box, Grid} from '@mui/material'
import {Panel, PanelBody, PanelHead} from '../../shared/Panel'
import {useI18n} from '../../core/i18n'
import {Enum} from '@alexandreannic/ts-utils'
import {Txt} from '../../shared/Txt/Txt'
import {capitalize} from '../../utils/Utils'

export const Dashboard = () => {
  const [answersIndex, setAnswersIndex] = useState<Record<string, FormAnswer>>({})
  const db = useFirebaseDbContext()
  const answers = useMemo(() => Object.values(answersIndex), [answersIndex])
  const {m} = useI18n()

  useEffect(() => {
    db.get(setAnswersIndex)
  }, [])

  return (
    <Animate>
      <div>
        <Grid container spacing={2} sx={{mb: 2}}>
          <Grid item sm={4} sx={{alignItems: 'stretch'}}>
            <Panel sx={{height: '100%', mb: 0}}>
              <PanelBody sx={{textAlign: 'center'}}>
                <Box sx={{fontSize: '7rem', lineHeight: 1,}}>
                  {answers.length}
                </Box>
                <Txt size="big" color="hint">{m.answers}</Txt>
              </PanelBody>
            </Panel>
          </Grid>
          <Grid item sm={8}>
            <Panel sx={{mb: 0}}>
              <PanelBody>
                <HorizontalBarChart
                  labelWidth={64}
                  barHeight={6}
                  grid={true}
                  data={[
                    {label: 'North', value: answers.filter(_ => _.area === 'north').length},
                    {label: 'East', value: answers.filter(_ => _.area === 'east').length},
                    {label: 'South', value: answers.filter(_ => _.area === 'south').length},
                    {label: 'West', value: answers.filter(_ => _.area === 'west').length},
                  ]}/>
              </PanelBody>
            </Panel>
          </Grid>
        </Grid>
        <Txt block sx={{fontSize: '1.6rem', mt: 3, mb: 1}}>{m.formOutcome.title.replace('...', ':')}</Txt>
        {Enum.entries(m.formOutcome.questions).map(([questionK, questionV]) =>
          <Panel>
            <PanelHead>{capitalize(questionV.replace('...', ''))}</PanelHead>
            <PanelBody>
              <HorizontalBarChart
                labelWidth={134}
                barHeight={6}
                grid={true}
                data={Enum.entries(m.formOutcome.breakthrough).map(([btk, btv]) => [
                    {label: <Txt bold size="big">{btv.title}</Txt>, disabled: true, value: 0},
                    ...Enum.entries(btv.options as Record<AllBreakthroughOptions, {title: string, desc: string}>).map(([k, v]) => (
                      {label: <Txt color="hint">{v.title}</Txt>, value: answers.reduce((acc, v) => acc + (v[questionK]?.includes(k) ? 1 : 0), 0)}
                    ))
                  ]
                ).flatMap(_ => _)}
              />
            </PanelBody>
          </Panel>
        )}
        {/*<Grid container spacing={2}>*/}
        {/*  <Grid item sm={6}>*/}
        {/*    <Panel>*/}
        {/*      <PanelBody>*/}

        {/*      </PanelBody>*/}
        {/*    </Panel>*/}
        {/*  </Grid>*/}
        {/*  <Grid item sm={6}>*/}
        {/*    <Panel>*/}
        {/*      <PanelBody>*/}

        {/*      </PanelBody>*/}
        {/*    </Panel>*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}
      </div>
    </Animate>
  )
}
