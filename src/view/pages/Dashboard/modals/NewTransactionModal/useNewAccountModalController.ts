import { useDashboard } from "../../components/DashboardContext/useDashboard";

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
  } = useDashboard();

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
  }
}
