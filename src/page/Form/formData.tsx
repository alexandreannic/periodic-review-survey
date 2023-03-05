import {en, Messages} from '../../core/i18n/localization/en'
import {Enum} from '@alexandreannic/ts-utils'

export interface IFormOutcome {
  readonly label: string
  readonly questions: {
    readonly id: keyof Messages['formQuestions']
    readonly label: string
    readonly options: {
      readonly id: string
      readonly title: string
      readonly desc: string
      readonly subOptions: {
        readonly id: string
        readonly title: string
        readonly desc: string
      }[]
    }[]
  }[]
}

export type IQuestion = IFormOutcome['questions'][0]

export type IOption = IQuestion['options'][0]

const options = (m: Messages): IOption[] => [
  {
    id: 'breakthrough1',
    title: m.breakthrough1.title,
    desc: m.breakthrough1.desc,
    subOptions: Enum.keys(m.breakthrough1.options).map(id => ({
      id,
      ...m.breakthrough1.options[id]
    })),
  },
  {
    id: 'breakthrough2',
    title: m.breakthrough2.title,
    desc: m.breakthrough2.desc,
    subOptions: Enum.keys(m.breakthrough2.options).map(id => ({
      id,
      ...m.breakthrough2.options[id]
    })),
  },
]

export type Area = keyof Messages['areas']

export const formOutcome = (m: Messages): IFormOutcome => ({
  label: m.formTitle,
  questions: Enum.keys(m.formQuestions).map(q => ({
    id: q,
    label: m.formQuestions[q],
    options: options(m),
  }))
})

export const area = (m: Messages) => Object.values(m.area)

export interface IFormArea {
  label: string
  options: string[]
}

export const formArea = Object.keys(en.messages.area)

// export const formArea = (m: Messages): IFormArea => ({
//   label: m.questionArea,
//   options: area(m),
// })