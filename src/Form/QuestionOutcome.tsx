import {Box} from '@mui/material'
import {IQuestion} from './formData'
import {Txt} from '../shared/Txt/Txt'
import {ScRadioGroup, ScRadioGroupItem} from '../shared/RadioGroup'
import {StepperActions} from '../shared/Stepper/StepperActions'
import {useStepperContext} from '../shared/Stepper/Stepper'
import {QuestionTitle} from './QuestionTitle'
import {Animate} from 'shared/Animate'

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
  const _stepper = useStepperContext()

  return (
    <Animate>
      <div>
        <QuestionTitle>{title}</QuestionTitle>
        <Txt size="title" block sx={{mb: 4}} bold>{q.label}</Txt>
        {q.options.map(option =>
          <Box sx={{mb: 3}}>
            <Txt bold size="big">
              {option.title}
            </Txt>
            <Box sx={{
              color: t => t.palette.text.secondary
            }}>
              {option.desc}
            </Box>
            <ScRadioGroup<string>
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
                  disabled={value ? value.length === 3 && !value.includes(sub.id) : false}
                  value={sub.id}
                  title={sub.title}
                  description={sub.desc}
                />
              )}
            </ScRadioGroup>
            {/*{option.subOptions.map(sub =>*/}
            {/*  <FormControlLabel*/}
            {/*    key={sub.title}*/}
            {/*    sx={{display: 'flex', alignItems: 'flex-start', mb: 1}}*/}
            {/*    control={<Checkbox/>}*/}
            {/*    label={*/}
            {/*      <Box>*/}
            {/*        <Txt bold block>{sub.title}</Txt>*/}
            {/*        <Txt color="hint" size="small">*/}
            {/*          {sub.desc}*/}
            {/*        </Txt>*/}
            {/*      </Box>*/}
            {/*    }*/}
            {/*  />*/}
            {/*)}*/}
          </Box>
        )}
        <StepperActions/>
      </div>
    </Animate>
  )
}
