import {FormAnswer} from './Form'
import {Animate} from '../../shared/Animate'
import {useI18n} from '../../core/i18n'
import {Txt} from '../../shared/Txt/Txt'
import {Alert, Box} from '@mui/material'
import {QuestionTitle} from './QuestionTitle'
import {StepperActions} from '../../shared/Stepper/StepperActions'
import {useStoreContext} from '../../core/context/StoreContext'
import {useFirebaseDbContext} from '../../core/firebaseDb/FirebaseDbContext'
import {Enum} from '@alexandreannic/ts-utils'
import {allOutcomeOptions} from './formData'
import React, {ReactNode} from 'react'
import {Messages} from '../../core/i18n/localization/en'

interface Answer {
  title: string
  desc?: string
}

const Question = ({
  question,
  answer,
  children,
}: {
  question: string
  answer?: Answer | Answer[]
  children?: ReactNode
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
        {children && (
          <Box sx={{ml: 5, mt: 1}}>
            {children}
          </Box>
        )}
        {answer && (
          <ul>
            {[answer].flatMap(_ => _).map((_, i) =>
              <Box component="li" sx={{mb: 1}} key={i}>
                <Txt bold block dangerouslySetInnerHTML={{__html: _.title}}/>
                {_.desc && (
                  <Txt color="hint">{_.desc}</Txt>
                )}
              </Box>
            )}
          </ul>
        )}
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

  const {
    office,
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
          <Question question={m.questionArea} answer={{title: m.offices[office!]}}/>
          <Txt size="big" bold>{m.formOutcome.title}</Txt>
          {Enum.entries(m.formOutcome.questions as Messages['formOutcome']['questions']).map(([k, v]) =>
            <Question
              key={k}
              question={v}
              answer={other[k]?.map(_ => allOutcomeOptions(m)[_]) ?? []}
            />
          )}
          <Question question={m.formDetails.title}>
            <Box sx={{whiteSpace: 'pre-wrap'}}>
              {other.details ?? ''}
            </Box>
          </Question>
        </div>
        <StepperActions
          loadingNext={_db.save.getLoading()}
          disableNext={_store.get.submitted}
          nextButtonLabel={m.confirm}
          next={onConfirm}
        />
      </Box>
    </Animate>
  )
}
