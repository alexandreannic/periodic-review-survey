import {useEffect, useMemo, useState} from 'react'
import {AllBreakthroughOptions, FormAnswer} from '../Form/Form'
import {useFirebaseDbContext} from '../../core/firebaseDb/FirebaseDbContext'
import {Box, Grid} from '@mui/material'
import {Panel, PanelBody, PanelHead} from '../../shared/Panel'
import {useI18n} from '../../core/i18n'
import {Enum} from '@alexandreannic/ts-utils'
import {Txt} from '../../shared/Txt/Txt'
import {capitalize} from '../../utils/Utils'
import {Layout} from '../../shared/Layout/Layout'
import {HorizontalBarChartGoogle} from '../../shared/HorizontalBarChart/HorizontalBarChartGoogle'
import {AnimateList} from 'mui-extension'
import {ScRadioGroup, ScRadioGroupItem} from '../../shared/RadioGroup'

const spacing = 2

export const Dashboard = () => {
  const [answersIndex, setAnswersIndex] = useState<Record<string, FormAnswer>>({})
  const db = useFirebaseDbContext()
  const answers = useMemo(() => Object.values(answersIndex), [answersIndex])
  const {m} = useI18n()
  const [filterAreas, setFilterAreas] = useState<string[]>(Object.keys(m.areas))
  const filteredAnswers = useMemo(() =>
      answers.filter(_ => filterAreas.length === 0 ? true : filterAreas.includes(_.area ?? '')),
    [filterAreas, answers])

  useEffect(() => {
    db.get(x => {
      setAnswersIndex(x)
    })
  }, [])

  return (
    <Layout width={968} sx={{
      background: '#f8fafd',
    }}>
      <Grid container spacing={spacing}>
        <Grid item md={4} sm={12} xs={12}>
          <AnimateList delay={300}>
            <Panel>
              <PanelBody sx={{textAlign: 'center'}}>
                <Box sx={{fontSize: '4rem', mr: 1, lineHeight: 1,}}>
                  {filteredAnswers.length}
                </Box>
                <Txt size="big" color="hint">{m.answers}</Txt>
              </PanelBody>
            </Panel>
            <ScRadioGroup<string> multiple dense value={filterAreas} onChange={setFilterAreas} sx={{mb: 2}}>
              {Enum.entries(m.areas).map(([k, v]) => (
                <ScRadioGroupItem key={k} value={k} title={v}/>
              ))}
            </ScRadioGroup>
            <Panel sx={{mb: 0}}>
              <PanelHead>
                {m.area}
              </PanelHead>
              <PanelBody>
                <HorizontalBarChartGoogle
                  data={Enum.entries(m.areas)
                    .filter(([k, v]) => filterAreas.length === 0 ? true : filterAreas.includes(k))
                    .map(([k, v]) => (
                        {label: v, value: filteredAnswers.filter(_ => _.area === k).length}
                      )
                    )}/>
              </PanelBody>
            </Panel>
          </AnimateList>
        </Grid>
        <Grid item md={8} sm={12} xs={12}>
          <Txt block bold sx={{fontSize: '1.6rem', mb: 1}}>{m.formOutcome.title.replace('...', ':')}</Txt>
          {Enum.entries(m.formOutcome.questions).map(([questionK, questionV]) =>
            <Panel key={questionK}>
              <PanelHead>{capitalize(questionV.replace('...', ''))}</PanelHead>
              <PanelBody sx={{pt: 0}}>
                <HorizontalBarChartGoogle
                  base={filteredAnswers.length}
                  data={Enum.entries(m.formOutcome.breakthrough).map(([btk, btv]) => [
                      {
                        label: <Txt bold size="big">{btv.title}</Txt>,
                        disabled: true,
                        value: 0
                      },
                      ...Enum.entries(btv.options as Record<AllBreakthroughOptions, {title: string, desc: string}>)
                        .map(([k, v]) => (
                          {
                            label: <Txt color="hint">{v.title}</Txt>,
                            value: filteredAnswers.reduce((acc, v) => acc + (v[questionK]?.includes(k) ? 1 : 0), 0),
                            desc: v.desc,
                          }
                        ))
                    ]
                  ).flatMap(_ => _)}
                />
              </PanelBody>
            </Panel>
          )}
        </Grid>
      </Grid>
    </Layout>
  )
}
