import {Area, IFormArea, IFormOutcome} from './formData'
import {QuestionOutcome} from './QuestionOutcome'
import {Stepper} from '../../shared/Stepper/Stepper'
import {QuestionArea} from './QuestionArea'
import {FormCompleted} from './FormCompleted'
import {useStoreContext} from '../../core/context/StoreContext'
import {useI18n} from '../../core/i18n'
import {useToast} from 'mui-extension'
import {useFirebaseDbContext} from '../../core/firebaseDb/FirebaseDbContext'
import {useEffectFn} from '@alexandreannic/react-hooks-lib'
import {Messages} from '../../core/i18n/localization/en'

export interface FormAnswer {
  area?: Area
  now?: string[]
  oneYear?: string[]
  end?: string[]
}

export const Form = ({
  formOutcome,
  formArea,
}: {
  formOutcome: IFormOutcome
  formArea: IFormArea
}) => {
  const _store = useStoreContext()
  const _db = useFirebaseDbContext()
  const {m} = useI18n()
  const {toastSuccess, toastError} = useToast()

  useEffectFn(_db.save.error, _ => {
    console.error(_)
    toastError(m.somethingWentWrong)
  })

  console.warn(_store.get.answers)
  return (
    <Stepper
      renderDone={
        <FormCompleted
          formAnswers={_store.get.answers}
          onConfirm={async () => {
            await _db.save.call(_store.get.answers)
            _store.set({submitted: true})
            toastSuccess(m.formSubmitted)
          }}
        />
      }
      initialStep={_store.get.submitted ? 4 : 0}
      steps={[
        {
          name: 'area',
          component: () => (
            <QuestionArea
              value={_store.get.answers.area}
              form={formArea}
              onChange={_ => _store.set({answers: {area: _}})}
            />
          )
        },
        ...formOutcome.questions.map(q => ({
          name: q.label,
          component: () =>
            <QuestionOutcome
              q={q}
              title={formOutcome.label}
              value={_store.get.answers[q.id]}
              onChange={_ => _store.set({answers: {[q.id]: _}})}
            />
        }))
      ]}
    />
  )
}
