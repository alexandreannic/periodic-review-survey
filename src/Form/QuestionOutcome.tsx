import {Box} from '@mui/material'
import {IQuestion} from './formData'
import {Txt} from '../shared/Txt/Txt'
import {ScRadioGroup, ScRadioGroupItem} from '../shared/RadioGroup'
import {StepperActions} from '../shared/Stepper/StepperActions'
import {useStepperContext} from '../shared/Stepper/Stepper'

export const QuestionOutcome = ({
  title,
  q,
}: {
  title: string
  q: IQuestion
}) => {
  const _stepper = useStepperContext()

  return (
    <div>
      <h1>{title}</h1>
      <Txt size="title" block sx={{mb: 2}} bold>{q.label}</Txt>
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
                title={sub.desc}
                // description={sub.desc}
                value={sub.title}
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
  )
}
