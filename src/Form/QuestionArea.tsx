import {ScRadioGroup, ScRadioGroupItem} from '../shared/RadioGroup'
import {IFormArea} from './formData'
import {Txt} from '../shared/Txt/Txt'
import {StepperActions} from '../shared/Stepper/StepperActions'


export const QuestionArea = ({
  form
}: {
  form: IFormArea
}) => {
  return (
    <div>
      <Txt component="h2" size="title" block sx={{mb: 2}}>{form.label}</Txt>
      <ScRadioGroup>
        {form.options.map(o =>
          <ScRadioGroupItem key={o} value={o} title={o}/>
        )}
      </ScRadioGroup>
      <StepperActions/>
    </div>
  )
}
