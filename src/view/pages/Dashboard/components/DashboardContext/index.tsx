import { createContext, useCallback, useState } from "react";

interface DashboardContextValue {
  areValuesVisible: boolean;
  toogleValueVisibility(): void;
  isNewAccountModalOpen: boolean;
  openNewAccountModal(): void;
  closeNewAccountModal(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue)

export function DashboardProvider ({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(true);

  const toogleValueVisibility = useCallback(() => {
    setAreValuesVisible(prevState => !prevState)
  }, [])

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true)
  }, [])

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false)
  }, [])

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toogleValueVisibility,
        isNewAccountModalOpen,
        openNewAccountModal,
        closeNewAccountModal
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
