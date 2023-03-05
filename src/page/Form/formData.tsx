import {Messages} from '../../core/i18n/localization/en'

export type Area = keyof Messages['areas']

export const allOutcomeOptions = (m: Messages) => ({
  ...m.formOutcome.breakthrough.breakthrough1.options,
  ...m.formOutcome.breakthrough.breakthrough2.options,
})
