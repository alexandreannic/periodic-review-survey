import {useEffect, useMemo, useState} from 'react'
import {AllBreakthroughOptions, FormAnswer} from '../Form/Form'
import {useFirebaseDbContext} from '../../core/firebaseDb/FirebaseDbContext'
import {Box, Checkbox, FormControlLabel, Grid} from '@mui/material'
import {Panel, PanelBody, PanelHead} from '../../shared/Panel'
import {useI18n} from '../../core/i18n'
import {Enum} from '@alexandreannic/ts-utils'
import {Txt} from '../../shared/Txt/Txt'
import {capitalize} from '../../utils/Utils'
import {Layout} from '../../shared/Layout/Layout'
import {HorizontalBarChartGoogle} from '../../shared/HorizontalBarChart/HorizontalBarChartGoogle'
import {AnimateList} from 'mui-extension'
import {ScRadioGroup, ScRadioGroupItem} from '../../shared/RadioGroup'
import {ScLineChart} from '../../shared/Chart/Chart'
import {allOutcomeOptions} from '../Form/formData'

const spacing = 2

const colors = {
  bt1_outcomeArea1: '#f44336',
  bt1_outcomeArea2: '#9c27b0',
  bt1_outcomeArea3: '#3f51b5',
  bt1_outcomeArea4: '#03a9f4',
  bt1_outcomeArea5: '#2e8c32',
  bt2_outcomeArea5: '#ffc107',
  bt2_outcomeArea6: '#6cf61b',
  bt2_outcomeArea7: '#000000',
  bt2_outcomeArea8: '#00e5ff',
  bt2_outcomeArea9: '#834bff',
}

export const Dashboard2 = () => {
  const [answersIndex, setAnswersIndex] = useState<Record<string, FormAnswer>>({})
  const db = useFirebaseDbContext()
  const answers = useMemo(() => Object.values(answersIndex), [answersIndex])
  const {m} = useI18n()
  const [filterAreas, setFilterAreas] = useState<string[]>(Object.keys(m.areas))
  const [filterOutcomes, setFilterOutcomes] = useState(Object.keys(allOutcomeOptions(m)))
  const filteredAnswers = useMemo(() =>
      answers.filter(_ => filterAreas.length === 0 ? true : filterAreas.includes(_.area ?? '')),
    [filterAreas, answers])

  useEffect(() => {
    db.get(x => {
      setAnswersIndex(x)
    })
  }, [])
  
  return (
    <Layout width={968}>
      <Grid container spacing={spacing}>
        <Grid item md={4} sm={12} xs={12}>
          <AnimateList delay={300}>
            <Panel>
              <PanelBody sx={{textAlign: 'center', display: 'flex', alignItems: 'flex-end'}}>
                <Box sx={{fontSize: '2rem', mr: 1, lineHeight: 1,}}>
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
            <Panel>
              <PanelBody>
                {Enum.entries(m.formOutcome.breakthrough).map(([bt, bv], i) =>
                  <>
                    <Txt bold block sx={{mt: i > 0 ? 2 : 0}}>{bv.title}</Txt>
                    {Enum.entries(m.formOutcome.breakthrough[bt].options as Record<AllBreakthroughOptions, {title: string, desc: string}>).map(([k, v]) =>
                      <>
                        <FormControlLabel
                          sx={{display: 'block',}}
                          label={v.title}
                          control={
                            <Checkbox
                              size="small"
                              sx={{'& svg': {fill: colors[k] + ' !important'}}}
                              checked={filterOutcomes.includes(k)}
                              onChange={e => {
                                if (e.target.checked) setFilterOutcomes(_ => [..._, k])
                                else setFilterOutcomes(_ => _.filter(o => o !== k))
                              }}
                            />
                          }
                        />
                      </>
                    )}
                  </>
                )}
              </PanelBody>
            </Panel>
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
          <Panel>
            <PanelBody sx={{pl: 0}}>
              <ScLineChart
                sx={{ml: -3, mr: -1}}
                hideLabelToggle
                curves={Enum.entries(allOutcomeOptions(m)).filter(([k, v]) => filterOutcomes.includes(k)).map(([k, v]) => (
                  {
                    label: v.title,
                    key: k,
                    color: colors[k],
                    curve: (() => {
                      const x = Enum.keys(m.formOutcome.questions)
                        // .filter(qk => filterOutcomes.includes(qk))
                        .map(qK => ({
                          date: qK,
                          count: filteredAnswers.reduce((acc, _) => acc + (_[qK]?.includes(k) ? 1 : 0), 0)
                        }))
                      return x
                    })()
                  }
                ))}/>
              {/*<ScLineChart curves={Enum.entries(allOutcomeOptions(m)).map(([k, v]) =>*/}
              {/*  {}  */}
              {/*)}*/}
              {/*/>*/}
            </PanelBody>
          </Panel>
          {Enum.entries(m.formOutcome.questions).map(([questionK, questionV]) =>
            <Panel key={questionK}>
              <PanelHead>{capitalize(questionV.replace('...', ''))}</PanelHead>
              <PanelBody sx={{pt: 0}}>
                <HorizontalBarChartGoogle
                  data={Enum.entries(m.formOutcome.breakthrough).map(([btk, btv]) => [
                      {
                        label: <Txt bold size="big">{btv.title}</Txt>,
                        disabled: true,
                        value: 0
                      },
                      ...Enum.entries(btv.options as Record<AllBreakthroughOptions, {title: string, desc: string}>)
                        .filter(([k, v]) => filterOutcomes.includes(k))
                        .map(([k, v]) => (
                          {
                            label: <Txt color="hint">{v.title}</Txt>,
                            value: filteredAnswers.reduce((acc, v) => acc + (v[questionK]?.includes(k) ? 1 : 0), 0),
                            desc: v.desc,
                            color: colors[k],
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