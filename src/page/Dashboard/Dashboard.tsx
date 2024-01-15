import {Fragment, useEffect, useMemo, useState} from 'react'
import {AllBreakthroughOptions, FormAnswer} from '../Form/Form'
import {useFirebaseDbContext} from '../../core/firebaseDb/FirebaseDbContext'
import {Box, Checkbox, Divider, FormControlLabel, Grid} from '@mui/material'
import {Panel, PanelBody, PanelHead} from '../../shared/Panel'
import {useI18n} from '../../core/i18n'
import {Enum, seq} from '@alexandreannic/ts-utils'
import {Txt} from '../../shared/Txt/Txt'
import {capitalize} from '../../utils/Utils'
import {Layout} from '../../shared/Layout/Layout'
import {HorizontalBarChartGoogle} from '../../shared/HorizontalBarChart/HorizontalBarChartGoogle'
import {ScRadioGroup, ScRadioGroupItem} from '../../shared/RadioGroup'
import {ScLineChart} from '../../shared/Chart/Chart'
import {allOutcomeOptions} from '../Form/formData'
import {useSetState} from '@alexandreannic/react-hooks-lib'
import {format} from 'date-fns'
import AnimateList from '../../shared/Animate/AnimateList'
import {CommentsPanel} from '../../shared/CommentsPanel'

const spacing = 2

const colors = {
  // bt1_outcomeArea1: '#f44336',
  // bt1_outcomeArea2: '#9c27b0',
  // bt1_outcomeArea3: '#3f51b5',
  // bt1_outcomeArea4: '#03a9f4',
  // bt1_outcomeArea5: '#2e8c32',
  // bt2_outcomeArea5: '#ffc107',
  // bt2_outcomeArea6: '#6cf61b',
  // bt2_outcomeArea7: '#000000',
  // bt2_outcomeArea8: '#00e5ff',
  // bt2_outcomeArea9: '#834bff',
  //
  bt1_outcomeArea1: '#FF4136',
  bt1_outcomeArea2: '#FF851B',
  bt1_outcomeArea3: '#FFDC00',
  bt1_outcomeArea4: '#3D9970',
  bt1_outcomeArea5: '#0074D9',
  bt2_outcomeArea5: '#B10DC9',
  bt2_outcomeArea6: '#FF0066',
  bt2_outcomeArea7: '#F012BE',
  bt2_outcomeArea8: '#FF6F61',
  bt2_outcomeArea9: '#7FDBFF',
}

export const Dashboard = () => {
  const db = useFirebaseDbContext()
  const {m} = useI18n()

  const [answersIndex, setAnswersIndex] = useState<Record<string, FormAnswer>>({})
  const answers = useMemo(() => seq(Object.values(answersIndex)), [answersIndex])

  // const [selectedYear, setSelectedYear] = useState([format(new Date(), 'yyyy')])
  // const [filterAreas, setFilterAreas] = useState<string[]>(Object.keys(m.areas))

  const [filters, setFilters] = useState({
    offices: Object.keys(m.offices),
    // areas: Object.keys(m.areas),
    years: [format(new Date(), 'yyyy')],
  })
  const filterOutcomes = useSetState(Object.keys(allOutcomeOptions(m)))
  const years = useMemo(() => {
    return answers.compactBy('savedAt').map(_ => {
      return format(_.savedAt, 'yyyy')
    }).distinct(_ => _)
  }, [answers])

  const filteredAnswers = useMemo(() => {
    return answers.filter(_ => {
      if (filters.offices.length > 0 && !filters.offices.includes(_.office ?? '')) return false
      // if (filters.areas.length > 0 && !filters.areas.includes(_.area ?? '')) return false
      if (!filters.years.includes(format(_.savedAt!, 'yyyy'))) return false
      return true
    })
  }, [filters, answers])

  useEffect(() => {
    db.get(setAnswersIndex)
  }, [])

  return (
    <Layout width={968} sx={{
      background: '#f8fafd',
    }}>
      <Grid container spacing={spacing}>
        <Grid item sm={4} xs={12}>
          {/*<Panel>*/}
          <Box sx={{textAlign: 'center', display: 'flex', alignItems: 'flex-end', mb: 2}}>
            <Box sx={{fontSize: '2rem', mr: 1, lineHeight: 1,}}>
              {filteredAnswers.length}
            </Box>
            <Txt size="big" color="hint">{m.answers}</Txt>
          </Box>
          {/*</Panel>*/}
          <AnimateList initialDelay={250} delay={150}>
            <Panel>
              <ScRadioGroup<string> multiple dense value={filters.years} onChange={c => setFilters(_ => ({..._, years: c}))}>
                {years.map(y => (
                  <ScRadioGroupItem key={y} value={y} title={y}/>
                ))}
              </ScRadioGroup>
            </Panel>
            <Panel>
              <ScRadioGroup<string> multiple dense value={filters.offices} onChange={c => setFilters(_ => ({..._, offices: c}))} sx={{border: 'none'}}>
                {Enum.entries(m.offices).map(([k, v]) => (
                  <ScRadioGroupItem key={k} value={k} title={v}/>
                ))}
              </ScRadioGroup>
            </Panel>
            <Panel>
              <PanelBody>
                {Enum.entries(m.formOutcome.breakthrough).map(([bk, bv], i) =>
                  <Fragment key={bk}>
                    <FormControlLabel
                      control={<Checkbox
                        {...(() => {
                          if (Enum.keys(m.formOutcome.breakthrough[bk].options).every(k => filterOutcomes.has(k))) {
                            return {checked: true}
                          } else if (Enum.keys(m.formOutcome.breakthrough[bk].options).find(k => filterOutcomes.has(k))) {
                            return {indeterminate: true, checked: false}
                          }
                          return {checked: false}
                        })()}
                        onChange={e => filterOutcomes[e.target.checked ? 'add' : 'delete'](Enum.keys(m.formOutcome.breakthrough[bk].options) as any)}
                      />}
                      label={<Txt bold block>{bv.title}</Txt>}
                    />
                    {Enum.entries(m.formOutcome.breakthrough[bk].options as Record<AllBreakthroughOptions, {title: string, desc: string}>).map(([k, v]) =>
                      <FormControlLabel
                        key={k}
                        sx={{display: 'block',}}
                        label={v.title}
                        control={
                          <Checkbox
                            size="small"
                            sx={{'& svg': {fill: colors[k] + ' !important'}}}
                            checked={filterOutcomes.has(k)}
                            onChange={e => e.target.checked ? filterOutcomes.add(k) : filterOutcomes.delete(k)}
                          />
                        }
                      />
                    )}
                    {i === 0 && <Divider sx={{my: 1}}/>}
                  </Fragment>
                )}
              </PanelBody>
            </Panel>
            <Panel sx={{mb: 0}}>
              <PanelHead>
                {m.area}
              </PanelHead>
              <PanelBody>
                <HorizontalBarChartGoogle
                  base={filteredAnswers.length}
                  data={Enum.entries(m.offices)
                    .filter(([k, v]) => filters.offices.length === 0 ? true : filters.offices.includes(k))
                    .map(([k, v]) => (
                        {label: v, value: filteredAnswers.filter(_ => _.office === k).length}
                      )
                    )}/>
              </PanelBody>
            </Panel>
          </AnimateList>
        </Grid>
        <Grid item sm={8} xs={12}>
          <Txt block bold sx={{fontSize: '1.6rem', mb: 1}}>{m.formOutcome.title.replace('...', ':')}</Txt>
          <AnimateList initialDelay={150} delay={250}>
            <Panel sx={{overflow: 'visible'}}>
              <PanelBody sx={{pl: 0}}>
                <ScLineChart
                  sx={{ml: -3, mr: -1}}
                  hideLabelToggle
                  curves={Enum.entries(allOutcomeOptions(m)).filter(([k, v]) => filterOutcomes.has(k)).map(([k, v]) => (
                    {
                      label: v.title,
                      key: k,
                      color: colors[k],
                      curve: (() => {
                        const x = Enum.keys(m.formOutcome.questions)
                          .map(qK => ({
                            date: qK,
                            count: filteredAnswers.reduce((acc, _) => acc + (_[qK]?.includes(k) ? 1 : 0), 0)
                          }))
                        return x
                      })()
                    }
                  ))}/>
              </PanelBody>
            </Panel>
            {Enum.entries(m.formOutcome.questions).map(([questionK, questionV]) =>
              <Panel key={questionK} title={capitalize(questionV.replace('...', ''))} expendable>
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
                          .filter(([k, v]) => filterOutcomes.has(k))
                          .map(([k, v]) => (
                            {
                              label: v.title,
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
            <Panel sx={{overflow: 'visible'}} title={m.formDetails.title}>
              <PanelBody>
                <CommentsPanel data={filteredAnswers.filter(_ => !!_.details).map((_, i) => ({
                  id: i,
                  desc: _.details,
                }))}/>
              </PanelBody>
            </Panel>
          </AnimateList>
        </Grid>
      </Grid>
    </Layout>
  )
}
