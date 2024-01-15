import {ScRadioGroup, ScRadioGroupItem} from '../../shared/RadioGroup'
import {Area, Office} from './formData'
import {StepperActions} from '../../shared/Stepper/StepperActions'
import {useStepperContext} from '../../shared/Stepper/Stepper'
import {QuestionTitle} from './QuestionTitle'
import {useStoreContext} from '../../core/context/StoreContext'
import {useI18n} from '../../core/i18n'
import {Enum} from '@alexandreannic/ts-utils'
import {Animate} from '../../shared/Animate'

export const QuestionArea = ({
  value,
  onChange,
}: {
  value?: Office
  onChange: (_: Office) => void
}) => {
  const {m} = useI18n()
  const _store = useStoreContext()
  const _stepper = useStepperContext()
  return (
    <Animate>
      <div>
        <QuestionTitle>{m.questionArea}</QuestionTitle>
        <ScRadioGroup<Office> disabled={_store.get.submitted} sx={{mt: 4}} value={value} onChange={_ => {
          onChange(_)
          setTimeout(_stepper.next, 150)
        }}>
          {Enum.entries(m.offices).map(([k, v]) =>
            <ScRadioGroupItem key={k} value={k} title={v}/>
          )}
        </ScRadioGroup>
        <StepperActions/>
      </div>
    </Animate>
  )
}
