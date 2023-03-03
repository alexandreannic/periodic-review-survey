import {FormAnswer} from './Form'
import {Animate} from '../shared/Animate'
import {formArea, formOutcome} from './formData'
import {useI18n} from '../core/i18n'
import {Txt} from '../shared/Txt/Txt'
import {Box} from '@mui/material'
import {QuestionTitle} from './QuestionTitle'
import {StepperActions} from '../shared/Stepper/StepperActions'

interface Answer {
  title: string
  detail?: string
}

const Question = ({
  question,
  answer
}: {
  question: string
  answer: Answer | Answer[]
}) => {
  return (
    <Box sx={{
      mb: 2,
      pb: 2,
      '&:not(:last-of-type)': {
        borderBottom: t => `1px solid ${t.palette.divider}`
      }
    }}>
      <Txt block size="big" bold>{question}</Txt>
      <Txt color="secondary">
        <ul>
          {[answer].flatMap(_ => _).map(_ =>
            <li key={_.title}>
              {_.title}
              {_.detail && (
                <><br/>{_.detail}</>
              )}
            </li>
          )}
        </ul>
      </Txt>
    </Box>
  )
}


export const FormCompleted = ({
  form
}: {
  form: FormAnswer
}) => {
  const {m} = useI18n()
  const allOutcomeOptions = {
    ...m.breakthrough1.options,
    ...m.breakthrough2.options,
  }
  const {
    area,
    ...other
  } = form
  return (
    <Animate>
      <Box>
        <QuestionTitle>{m.yourAnswers}</QuestionTitle>
        <div>
          <Question question={formArea(m).label} answer={{title: area!}}/>
          {(formOutcome(m).questions.map(_ => _.id) as (keyof typeof other)[]).map(q => {
            const answserIds = (other[q] ?? []) as Array<keyof typeof allOutcomeOptions>
            return (
              <Question
                question={q}
                answer={answserIds.map(_ => allOutcomeOptions[_])}
              />
            )
          })}
        </div>
        <StepperActions nextButtonLabel={m.confirm} next={() => {
          console.log(form)
        }}/>
      </Box>
    </Animate>
  )
}
