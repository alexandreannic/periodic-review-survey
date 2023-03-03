import {Box} from '@mui/material'
import {IQuestion} from './formData'
import {Txt} from '../shared/Txt/Txt'
import {ScRadioGroup, ScRadioGroupItem} from '../shared/RadioGroup'
import {StepperActions} from '../shared/Stepper/StepperActions'
import {useStepperContext} from '../shared/Stepper/Stepper'
import {Animate} from '../shared/Animate'
import {QuestionTitle} from './QuestionTitle'

export const QuestionOutcome = ({
  title,
  q,
  value,
  onChange,
}: {
  value?: string,
  onChange: (_: string) => void
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
            <ScRadioGroup sx={{my: 1}} multiple dense>
              {option.subOptions.map(sub =>
                <ScRadioGroupItem
                  value={sub.id}
                  title={sub.desc}
                  // description={sub.desc}
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
