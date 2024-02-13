import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { bankAccontsService } from "../../../../../app/services/bankAccountsService";

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

  const { data, isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccontsService.getAll,
  })

  const currentBalance = useMemo(() => {
    if (!data) return 0;

    return data.reduce((total, account) => total + account.currentBalance, 0)
  }, [data])

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toogleValueVisibility,
    isLoading: isFetching,
    accounts: data ?? [],
    openNewAccountModal,
    currentBalance
  }
}
