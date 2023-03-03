import {Messages} from '../core/i18n/localization/fr'

export interface IFormOutcome {
  label: string
  questions: {
    label: string
    options: {
      title: string
      desc: string
      subOptions: {
        title: string
        desc: string
      }[]
    }[]
  }[]
}

export type IQuestion = IFormOutcome['questions'][0]

export type IOption = IQuestion['options'][0]

const options = (m: Messages): IOption[] => [
  {
    title: m.breakthrough1.title,
    desc: m.breakthrough1.desc,
    subOptions: m.breakthrough1.options,
  },
  {
    title: m.breakthrough2.title,
    desc: m.breakthrough2.desc,
    subOptions: m.breakthrough2.options,
  },
]

export const formOutcome = (m: Messages): IFormOutcome => ({
  label: m.formTitle,
  questions: m.formQuestions.map(q => ({
    label: q,
    options: options(m),
  }))
})

export const area = (m: Messages) => [
  m.north,
  m.east,
  m.south,
  m.west,
]

export interface IFormArea {
  label: string
  options: string[]
}

export const formArea = (m: Messages): IFormArea => ({
  label: m.questionArea,
  options: area(m),
})
