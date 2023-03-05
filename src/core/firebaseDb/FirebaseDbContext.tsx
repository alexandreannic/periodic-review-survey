import * as React from 'react'
import {ReactNode, useContext} from 'react'
import {FirebaseDb} from './FirebaseDb'
import {UseAsync, useAsync} from '@alexandreannic/react-hooks-lib'
import {FormAnswer} from '../../page/Form/Form'

export interface FirebaseDbContextProps {
  get: (cb: (answers: Record<string, FormAnswer>) => void) => void
  save: UseAsync<FirebaseDb['save']>
}

const FirebaseDbContext = React.createContext<FirebaseDbContextProps>({} as any)

export const useFirebaseDbContext = () => useContext(FirebaseDbContext)

export const FirebaseDbProvider = ({
  children,
  db
}: {
  db: FirebaseDb
  children: ReactNode
}) => {

  const save = useAsync(db.save)

  return (
    <FirebaseDbContext.Provider
      value={{
        save,
        get: db.get,
      }}
    >
      {children}
    </FirebaseDbContext.Provider>
  )
}


