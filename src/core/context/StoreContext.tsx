import * as React from 'react'
import {ReactNode, useContext, useState} from 'react'
import {FormAnswer} from '../../page/Form/Form'
import {usePersistentState} from 'react-persistent-state'

interface Store {
  submitted: boolean
  answers: FormAnswer
}

export interface StoreContextProps {
  get: Store
  set: (_: Partial<Store>) => void
}

const StoreContext = React.createContext<StoreContextProps>({} as any)

export const StoreProvider = ({children}: {children: ReactNode}) => {
  // const [store, setStore] = useState<Store>({submitted: false, answers: {}})
  const [store, setStore] = usePersistentState<Store>({submitted: false, answers: {}}, 'store')
  
  const set = (_: Partial<Store>) => {
    setStore(prev => ({
      ...prev,
      ..._,
      answers: {
        ...prev.answers,
        ..._.answers
      }
    }))
    
  }
  return (
    <StoreContext.Provider
      value={{
        get: store,
        set
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useStoreContext = () => useContext(StoreContext)
