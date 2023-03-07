import {Area} from './formData'
import {QuestionOutcome} from './QuestionOutcome'
import {Stepper} from '../../shared/Stepper/Stepper'
import {QuestionArea} from './QuestionArea'
import {FormCompleted} from './FormCompleted'
import {useStoreContext} from '../../core/context/StoreContext'
import {useI18n} from '../../core/i18n'
import {useToast} from 'mui-extension'
import {useFirebaseDbContext} from '../../core/firebaseDb/FirebaseDbContext'
import {useEffectFn} from '@alexandreannic/react-hooks-lib'
import {Enum} from '@alexandreannic/ts-utils'
import {Messages} from '../../core/i18n/localization/en'
import {Layout} from '../../shared/Layout/Layout'

export type AllBreakthroughOptions = keyof Messages['formOutcome']['breakthrough']['breakthrough2']['options'] | keyof Messages['formOutcome']['breakthrough']['breakthrough1']['options']

export interface FormAnswer {
  savedAt?: string
  area?: Area
  now?: AllBreakthroughOptions[]
  oneYear?: AllBreakthroughOptions[]
  end?: AllBreakthroughOptions[]
}

export const Form = () => {
  const _store = useStoreContext()
  const _db = useFirebaseDbContext()
  const {m} = useI18n()
  const {toastSuccess, toastError} = useToast()

  useEffectFn(_db.save.error, _ => {
    console.error(_)
    toastError(m.somethingWentWrong)
  })

  return (
    <Layout>
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
                onChange={_ => _store.set({answers: {area: _}})}
              />
            )
          },
          ...Enum.entries(m.formOutcome.questions).map(([k, v]) => ({
            name: k,
            component: () =>
              <QuestionOutcome
                key={k}
                label={v}
                value={_store.get.answers[k]}
                onChange={_ => _store.set({answers: {[k]: _}})}
              />
          }))
        ]}
      />
    </Layout>
  )
}
