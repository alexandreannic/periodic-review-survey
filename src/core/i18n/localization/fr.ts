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

export type Messages = typeof fr['messages']

export const fr = Object.freeze({
  formatDate,
  formatTime,
  formatDateTime,
  dateFromNow,
  formatDuration,
  formatLargeNumber,
  messages: {
    // signalconsoCatchWord: `Signaler un problème à <b>l&apos;entreprise</b> <br/> en toute transparence avec <b>la répression des fraudes</b> !`,
    // signalconsoCatchWord: `Signaler un problème à l&apos;entreprise<br/> en toute transparence avec la répression des fraudes !`,
    yes: 'Yes',
    no: 'No',
    previous: 'Previous',
    next: 'Next',
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
        outcomeArea1: {title: 'Outcome Area 1', desc: 'Safer communities have'},
        outcomeArea2: {title: 'Outcome Area 2', desc: `People's basic capacity and systems to reduce all forms needs are met of violence protect, and fulfil the rights of people`},
        outcomeArea3: {title: 'Outcome Area 3', desc: 'Duty bearers act to respect'},
        outcomeArea4: {title: 'Outcome Area 4', desc: 'People can claim respect for'},
        outcomeArea5: {title: 'Outcome Area 5', desc: 'People can effectively leverage protection of, and fulfilment of, their rights systems to fulfil their rights?'},
      }
    },
    breakthrough2: {
      title: 'Breakthrough 2',
      desc: 'On a par with others, people affected by conflict and displacement must be able to pursue self-reliance',
      options: {
        outcomeArea5: {title: 'Outcome Area 5', desc: 'People can effectively leverage systems to fulfil their rights',},
        outcomeArea6: {title: 'Outcome Area 6', desc: 'People have more decent and resilient livelihoods',},
        outcomeArea7: {title: 'Outcome Area 7', desc: 'Social cohesion in communities / societies is enhanced',},
        outcomeArea8: {title: 'Outcome Area 8', desc: 'People can effectively participate in a just and equitable civic life',},
        outcomeArea9: {title: 'Outcome Area 9', desc: 'Exposure and vulnerability to disasters and shocks is reduced',},
      },
    },
    questionArea: 'In which area are you working ?',
    north: 'North',
    east: 'East',
    south: 'South',
    west: 'Westh'
  },
})