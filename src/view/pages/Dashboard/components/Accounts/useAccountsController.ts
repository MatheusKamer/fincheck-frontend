import { useMemo, useState } from "react";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const {
    areValuesVisible,
    toogleValueVisibility,
    openNewAccountModal,
  } = useDashboard()

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { accounts, isFetching} = useBankAccounts();

  const currentBalance = useMemo(() => {
    return accounts.reduce((total, account) => total + account.currentBalance, 0)
  }, [accounts])

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toogleValueVisibility,
    isLoading: isFetching,
    accounts,
    openNewAccountModal,
    currentBalance
  }
}
