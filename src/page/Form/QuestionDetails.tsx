import {useI18n} from '../../core/i18n'
import {Animate} from '../../shared/Animate'
import {QuestionTitle} from './QuestionTitle'
import {TextField} from '@mui/material'
import {useState} from 'react'
import {StepperActions} from '../../shared/Stepper/StepperActions'
import {useStepperContext} from '../../shared/Stepper/Stepper'
import {Txt} from '../../shared/Txt/Txt'

export const QuestionDetails = ({
  value,
  onChange,
}: {
  value?: string,
  onChange: (_: string) => void
}) => {
  const _stepper = useStepperContext()
  const {m} = useI18n()
  // const [innerValue, setInnerValue] = useState(value)

  return (
    <Animate>
      <div>
        <Txt size="title" block sx={{mb: 4}} bold>{m.formDetails.title}</Txt>
        <TextField
          multiline
          fullWidth
          minRows={6}
          maxRows={12}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        <StepperActions next={() => {
          _stepper.next()
        }}/>
      </div>
    </Animate>
  )
}