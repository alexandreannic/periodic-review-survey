import {IFormArea, IFormOutcome} from './formData'
import {QuestionOutcome} from './QuestionOutcome'
import {Stepper} from '../shared/Stepper/Stepper'
import {QuestionArea} from './QuestionArea'
import {useState} from 'react'
import {FormCompleted} from './FormCompleted'

export interface FormAnswer {
  area?: string
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
  const [form, setForm] = useState<FormAnswer>({})
  return (
    <div>
      <Stepper
        initialStep={4}
        renderDone={<FormCompleted form={{
          'area': 'East',
          'now': [
            'bt1_outcomeArea3',
            'bt1_outcomeArea2',
            'bt1_outcomeArea1'
          ],
          'oneYear': [
            'bt1_outcomeArea2',
            'bt1_outcomeArea1',
            'bt1_outcomeArea3'
          ],
          'end': [
            'bt1_outcomeArea1',
            'bt1_outcomeArea2',
            'bt1_outcomeArea3'
          ]
        }}/>}
        steps={[
          {
            name: 'area',
            component: () => (
              <QuestionArea
                form={formArea}
                onChange={_ => setForm(prev => ({...prev, area: _}))}
              />
            )
          },
          ...formOutcome.questions.map(q => ({
            name: q.label,
            component: () =>
              <QuestionOutcome
                q={q}
                title={formOutcome.label}
                value={(form as any)[q.id]}
                onChange={_ => setForm(prev => ({...prev, [q.id]: _}))}
              />
          }))
        ]}
      />
    </div>
  )
}
