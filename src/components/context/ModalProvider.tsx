import { createContext, useContext, useState } from 'react'

//Defining context
export const ModalContext = createContext(undefined)

//Context Wrapper
export function ModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <ModalContext.Provider value={[isModalOpen, setIsModalOpen]}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModalContext() {
  return useContext(ModalContext)
}
