import {useEffect, useMemo, useState} from 'react'
import {FormAnswer} from '../Form/Form'
import {useFirebaseDbContext} from '../../core/firebaseDb/FirebaseDbContext'
import {HorizontalBarChart} from '../../shared/HorizontalBarChart/HorizontalBarChart'

export const Dashboard = () => {
  const [answersIndex, setAnswersIndex] = useState<Record<string, FormAnswer>>({})
  const db = useFirebaseDbContext()
  const answers = useMemo(() => Object.values(answersIndex), [answersIndex])
  
  useEffect(() => {
    db.get(setAnswersIndex)
  }, [])
  
  return (
    <div>
      {answers.length}
      
      <HorizontalBarChart grid={true} data={[
        {label: 'North', value: answers.filter(_ => _.area === 'north').length},
        {label: 'East', value: answers.filter(_ => _.area === 'east').length},
        {label: 'South', value: answers.filter(_ => _.area === 'south').length},
        {label: 'West', value: answers.filter(_ => _.area === 'west').length},
      ]}/>
    </div>
  )
}
