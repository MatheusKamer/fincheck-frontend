import { useNewAccountModalController } from "./useNewAccountModalController";
import { Modal } from "../../../../components/Modal";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Input } from "../../../../components/Input";
import { Select } from "../../../../components/Select";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";

/**
 * @author Matheus Kamer
 */

export function NewAccountModal() {
  const { closeNewAccountModal, isNewAccountModalOpen } = useNewAccountModalController()

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo</span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px]">R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            placeholder="Nome da conta"
          />

          <Select
            placeholder="Tipo"
            options={[
              {
                value: "CHECKING",
                label: "Conta Corrente"
              },
              {
                value: "INVESTMENT",
                label: "Investimento"
              },
              {
                value: "CASH",
                label: "Dinheiro Físico"
              },
            ]}
          />

          <ColorsDropdownInput />
        </div>
      </form>
    </Modal>
  )
}