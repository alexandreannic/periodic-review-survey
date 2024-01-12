import {ScRadioGroup, ScRadioGroupItem} from '../../shared/RadioGroup'
import {Area} from './formData'
import {StepperActions} from '../../shared/Stepper/StepperActions'
import {useStepperContext} from '../../shared/Stepper/Stepper'
import {Animate} from 'shared/Animate'
import {QuestionTitle} from './QuestionTitle'
import {useStoreContext} from '../../core/context/StoreContext'
import {useI18n} from '../../core/i18n'
import {Enum} from '@alexandreannic/ts-utils'

export const QuestionArea = ({
  value,
  onChange,
}: {
  value?: Area
  onChange: (_: Area) => void
}) => {
  const {m} = useI18n()
  const _store = useStoreContext()
  const _stepper = useStepperContext()
  return (
    <Animate>
      <div>
        <QuestionTitle>{m.questionArea}</QuestionTitle>
        <ScRadioGroup<Area> disabled={_store.get.submitted} sx={{mt: 4}} value={value} onChange={_ => {
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
