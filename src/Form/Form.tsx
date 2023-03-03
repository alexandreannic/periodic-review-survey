import {IFormArea, IFormOutcome} from './formData'
import {QuestionOutcome} from './QuestionOutcome'
import {Stepper} from '../shared/Stepper/Stepper'
import {QuestionArea} from './QuestionArea'
import {useState} from 'react'

interface FormAnswer {
  area?: string
  now?: string
  oneYear?: string
  end?: string
}

export const Form = ({
  formOutcome,
  formArea,
}: {
  formOutcome: IFormOutcome
  formArea: IFormArea
}) => {
  const [state, setState] = useState<FormAnswer>({})
  console.log(state)
  return (
    <div>
      <Stepper
        steps={[
          {
            name: 'area',
            component: () => (
              <QuestionArea
                form={formArea}
                onChange={_ => setState(prev => ({...prev, area: _}))}
              />
            )
          },
          ...formOutcome.questions.map(q => ({
            name: q.label,
            component: () =>
              <QuestionOutcome
                q={q}
                title={formOutcome.label}
                onChange={_ => setState(prev => ({...prev, [q.id]: _}))}
              />
          }))
        ]}
      />
    </div>
  )
}
