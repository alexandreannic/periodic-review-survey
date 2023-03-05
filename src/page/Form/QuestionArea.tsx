import {ScRadioGroup, ScRadioGroupItem} from '../../shared/RadioGroup'
import {Area, IFormArea} from './formData'
import {StepperActions} from '../../shared/Stepper/StepperActions'
import {useStepperContext} from '../../shared/Stepper/Stepper'
import {Animate} from 'shared/Animate'
import {QuestionTitle} from './QuestionTitle'
import {useStoreContext} from '../../core/context/StoreContext'
import {Messages} from '../../core/i18n/localization/en'


export const QuestionArea = ({
  form,
  value,
  onChange,
}: {
  form: IFormArea
  value?: Area
  onChange: (_: Area) => void
}) => {
  console.log(value)
  const _store = useStoreContext()
  const _stepper = useStepperContext()
  return (
    <Animate>
      <div>
        <QuestionTitle>{form.label}</QuestionTitle>
        <ScRadioGroup<Area> disabled={_store.get.submitted} sx={{mt: 4}} value={value} onChange={_ => {
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
