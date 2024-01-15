import {Box} from '@mui/material'
import {Txt} from '../../shared/Txt/Txt'
import {ScRadioGroup, ScRadioGroupItem} from '../../shared/RadioGroup'
import {StepperActions} from '../../shared/Stepper/StepperActions'
import {QuestionTitle} from './QuestionTitle'
import {useStoreContext} from '../../core/context/StoreContext'
import {useToast} from 'mui-extension'
import {useI18n} from '../../core/i18n'
import {useStepperContext} from '../../shared/Stepper/Stepper'
import {Enum} from '@alexandreannic/ts-utils'
import {Animate} from '../../shared/Animate'

export const QuestionOutcome = ({
  label,
  value,
  onChange,
}: {
  value?: string[],
  onChange: (_: string[]) => void
  label: string
}) => {
  const {m} = useI18n()
  const _store = useStoreContext()
  const _stepper = useStepperContext()
  const {toastWarning} = useToast()
  return (
    <Animate>
      <div>
        <QuestionTitle>{m.formOutcome.title}</QuestionTitle>
        <Txt size="title" block sx={{mb: 4}} bold>{label}</Txt>
        {Enum.entries(m.formOutcome.breakthrough).map(([btk, btv]) =>
          <Box key={btk} sx={{mb: 3}}>
            <Txt bold size="big">
              {btv.title}
            </Txt>
            <Box sx={{
              color: t => t.palette.text.secondary
            }}>
              {btv.desc}
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
              {Enum.entries(btv.options as Record<string, {title: string, desc: string}>).map(([k, v]) =>
                <ScRadioGroupItem
                  key={k}
                  value={k}
                  title={v.title}
                  disabled={value ? value.length === 3 && !value.includes(k) : false}
                  description={v.desc}
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
