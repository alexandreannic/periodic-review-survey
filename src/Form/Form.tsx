import {IFormArea, IFormOutcome} from './formData'
import {QuestionOutcome} from './QuestionOutcome'
import {Stepper} from '../shared/Stepper/Stepper'
import {QuestionArea} from './QuestionArea'

export const Form = ({
  formOutcome,
  formArea,
}: {
  formOutcome: IFormOutcome
  formArea: IFormArea
}) => {
  return (
    <div>
      <Stepper
        steps={[
          {
            name: formArea.label,
            component: () => <QuestionArea form={formArea}/>
          },
          ...formOutcome.questions.map(q => ({
            name: q.label,
            // label: q.label,
            component: () => <QuestionOutcome title={formOutcome.label} q={q}/>
          }))
        ]}
      />
    </div>
  )
}
