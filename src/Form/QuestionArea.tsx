import {ScRadioGroup, ScRadioGroupItem} from '../shared/RadioGroup'
import {IFormArea} from './formData'
import {StepperActions} from '../shared/Stepper/StepperActions'
import {useStepperContext} from '../shared/Stepper/Stepper'
import {Animate} from 'shared/Animate'
import {QuestionTitle} from './QuestionTitle'


export const QuestionArea = ({
  form,
  value,
  onChange,
}: {
  form: IFormArea
  value?: string
  onChange: (_: string) => void
}) => {
  const _stepper = useStepperContext()
  return (
    <Animate>
      <div>
        <QuestionTitle>{form.label}</QuestionTitle>
        <ScRadioGroup sx={{mt: 4}} value={value} onChange={_ => {
          onChange(_)
          setTimeout(_stepper.next, 150)
        }}>
          {form.options.map(o =>
            <ScRadioGroupItem key={o} value={o} title={o}/>
          )}
        </ScRadioGroup>
        <StepperActions/>
      </div>
    </Animate>
  )
}
