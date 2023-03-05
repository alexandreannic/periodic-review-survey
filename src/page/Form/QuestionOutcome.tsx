import {Box} from '@mui/material'
import {IQuestion} from './formData'
import {Txt} from '../../shared/Txt/Txt'
import {ScRadioGroup, ScRadioGroupItem} from '../../shared/RadioGroup'
import {StepperActions} from '../../shared/Stepper/StepperActions'
import {QuestionTitle} from './QuestionTitle'
import {Animate} from 'shared/Animate'
import {useStoreContext} from '../../core/context/StoreContext'
import {useToast} from 'mui-extension'
import {useI18n} from '../../core/i18n'
import {useStepperContext} from '../../shared/Stepper/Stepper'

export const QuestionOutcome = ({
  title,
  q,
  value,
  onChange,
}: {
  value?: string[],
  onChange: (_: string[]) => void
  title: string
  q: IQuestion
}) => {
  const {m} = useI18n()
  const _store = useStoreContext()
  const _stepper = useStepperContext()
  const {toastWarning} = useToast()
  return (
    <Animate>
      <div>
        <QuestionTitle>{title}</QuestionTitle>
        <Txt size="title" block sx={{mb: 4}} bold>{q.label}</Txt>
        {q.options.map(option =>
          <Box key={option.id} sx={{mb: 3}}>
            <Txt bold size="big">
              {option.title}
            </Txt>
            <Box sx={{
              color: t => t.palette.text.secondary
            }}>
              {option.desc}
            </Box>
            <ScRadioGroup<string>
              disabled={_store.get.submitted}
              sx={{my: 1}}
              value={value}
              multiple
              dense
              onChange={_ => {
                onChange(_)
              }}
            >
              {option.subOptions.map(sub =>
                <ScRadioGroupItem
                  key={sub.id}
                  value={sub.id}
                  title={sub.title}
                  disabled={value ? value.length === 3 && !value.includes(sub.id) : false}
                  description={sub.desc}
                />
              )}
            </ScRadioGroup>
          </Box>
        )}
        <StepperActions next={() => {
          if(!value || value.length < 3) {
            toastWarning(m.select3Outcomes)
          } else {
            _stepper.next()
          }
        }}/>
      </div>
    </Animate>
  )
}
