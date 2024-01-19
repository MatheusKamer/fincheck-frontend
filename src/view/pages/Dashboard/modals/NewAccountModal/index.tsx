import { useNewAccountModalController } from "./useNewAccountModalController";
import { Modal } from "../../../../components/Modal";
import { InputCurrency } from "../../../../components/InputCurrency";

/**
 * @author Matheus Kamer
 */

export function NewAccountModal() {
  const { closeNewAccountModal, isNewAccountModalOpen } = useNewAccountModalController()

  return (
    <Modal
      title="Nova Conta" open={isNewAccountModalOpen} onClose={closeNewAccountModal}
    >
      <InputCurrency />
    </Modal>
  )
}
