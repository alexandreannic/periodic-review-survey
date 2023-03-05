import {FormAnswer} from './Form'
import {Animate} from '../../shared/Animate'
import {formArea, formOutcome} from './formData'
import {useI18n} from '../../core/i18n'
import {Txt} from '../../shared/Txt/Txt'
import {Alert, Box} from '@mui/material'
import {QuestionTitle} from './QuestionTitle'
import {StepperActions} from '../../shared/Stepper/StepperActions'
import {useStoreContext} from '../../core/context/StoreContext'
import {useFirebaseDbContext} from '../../core/firebaseDb/FirebaseDbContext'

interface Answer {
  title: string
  desc?: string
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
          {[answer].flatMap(_ => _).map((_, i) =>
            <Box component="li" sx={{mb: 1}} key={i}>
              <Txt bold block>{_.title}</Txt>
              {_.desc && (
                <Txt color="hint">{_.desc}</Txt>
              )}
            </Box>
          )}
        </ul>
      </Txt>
    </Box>
  )
}


export const FormCompleted = ({
  formAnswers,
  onConfirm,
}: {
  formAnswers: FormAnswer
  onConfirm: () => void
}) => {
  const _db = useFirebaseDbContext()
  const _store = useStoreContext()
  const {m} = useI18n()
  const allOutcomeOptions = {
    ...m.breakthrough1.options,
    ...m.breakthrough2.options,
  }
  console.log(allOutcomeOptions)
  const {
    area,
    ...other
  } = formAnswers
  return (
    <Animate>
      <Box>
        {_store.get.submitted && (
          <Alert color={'success'}>
            <Txt size="big">{m.formSubmitted}</Txt>
          </Alert>
        )}
        <QuestionTitle>{m.yourAnswers}</QuestionTitle>
        <div>
          <Question question={formArea(m).label} answer={{title: area!}}/>
          {(formOutcome(m).questions.map(_ => _.id) as (keyof typeof other)[]).map(q => {
            const answerIds = (other[q] ?? []) as Array<keyof typeof allOutcomeOptions>
            return (
              <Question
                key={q}
                question={m.formQuestions[q]}
                answer={answerIds.map(_ => allOutcomeOptions[_])}
              />
            )
          })}
        </div>
        <StepperActions
          loadingNext={_db.save.loading}
          disableNext={_store.get.submitted}
          nextButtonLabel={m.confirm}
          next={onConfirm}
        />
      </Box>
    </Animate>
  )
}
