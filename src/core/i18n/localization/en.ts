import {formatDistance, formatDuration as formatDurationFns} from 'date-fns'

const invalidDate = '-'

const isDateValid = (d?: Date): boolean => {
  return !!d && d instanceof Date && !isNaN(d.getTime())
}

const formatDate = (d?: Date): string => {
  if (!isDateValid(d)) return invalidDate
  return d!.toLocaleDateString()
}

const formatTime = (d?: Date): string => {
  if (!isDateValid(d)) return invalidDate
  return d!.toLocaleTimeString()
}

const formatDateTime = (d?: Date): string => {
  if (!isDateValid(d)) return invalidDate
  return formatDate(d) + ' ' + formatTime(d)
}

const dateFromNow = (d?: Date): string | undefined => {
  return d ? formatDistance(d, new Date(), {addSuffix: true}) : undefined
}

const formatLargeNumber = (n?: number): string => {
  return n !== undefined && n !== null ? n.toLocaleString('fr-FR') : '-'
}

const formatDuration = formatDurationFns

export type Messages = typeof en['messages']

export const en = Object.freeze({
  formatDate,
  formatTime,
  formatDateTime,
  dateFromNow,
  formatDuration,
  formatLargeNumber,
  messages: {
    area: `Area',`
    noDataAtm: 'No data at the moment',
    seeResults: `See results`,
    select3Outcomes: `Please, select 3 outcomes`,
    somethingWentWrong: 'Something went wrong',
    yes: 'Yes',
    no: 'No',
    previous: 'Previous',
    next: 'Next',
    yourAnswers: 'You answers',
    confirm: 'Confirm',
    formTitle: 'What are the 3 outcomes that...',
    formQuestions: {
      now: '...you think we are most contributing to now?',
      oneYear: '...you feel we should be most contributing to one year from now?',
      end: '...you feel we should be most contributing to by the end of DRC’s current strategy (2025)',
    },
    breakthrough1: {
      title: 'Breakthrough 1',
      desc: 'Equal to others, people affected by conflict and displacement must be able to seek safety and claim basic rights',
      options: {
        bt1_outcomeArea1: {title: 'Outcome Area 1', desc: 'Safer communities have capacity and systems to reduce all forms of violence'},
        bt1_outcomeArea2: {title: 'Outcome Area 2', desc: `People's basic needs are met`},
        bt1_outcomeArea3: {title: 'Outcome Area 3', desc: 'Duty bearers act to respect, protect, and fulfil the rights of people'},
        bt1_outcomeArea4: {title: 'Outcome Area 4', desc: 'People can claim respect for protection of, and fulfilment of, their rights'},
        bt1_outcomeArea5: {title: 'Outcome Area 5', desc: 'People can effectively leverage systems to fulfil their rights'},
      }
    },
    formSubmitted: 'Answers successfully submitted',
    breakthrough2: {
      title: 'Breakthrough 2',
      desc: 'On a par with others, people affected by conflict and displacement must be able to pursue self-reliance',
      options: {
        bt2_outcomeArea5: {title: 'Outcome Area 5', desc: 'People can effectively leverage systems to fulfil their rights',},
        bt2_outcomeArea6: {title: 'Outcome Area 6', desc: 'People have more decent and resilient livelihoods',},
        bt2_outcomeArea7: {title: 'Outcome Area 7', desc: 'Social cohesion in communities / societies is enhanced',},
        bt2_outcomeArea8: {title: 'Outcome Area 8', desc: 'People can effectively participate in a just and equitable civic life',},
        bt2_outcomeArea9: {title: 'Outcome Area 9', desc: 'Exposure and vulnerability to disasters and shocks is reduced',},
      },
    },
    questionArea: 'In which area are you working ?',
    area: {
      north: 'North',
      east: 'East',
      south: 'South',
      west: 'West'
    }
  },
})
