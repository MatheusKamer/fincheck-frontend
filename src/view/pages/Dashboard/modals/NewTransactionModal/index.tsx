import { useNewTransactionModalController } from "./useNewAccountModalController";
import { Modal } from "../../../../components/Modal";
import { Input } from "../../../../components/Input";
import { Button } from "../../../../components/Button";
import { Select } from "../../../../components/Select";
import { InputCurrency } from "../../../../components/InputCurrency";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";

export function NewTransactionModal() {
  const { closeNewTransactionModal, isNewTransactionModalOpen } = useNewTransactionModalController()

  return (
    <Modal
      title="Nova Conta"
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
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

        <Button type="submit" className="w-full mt-6">
            Criar
        </Button>
      </form>
    </Modal>
  )
}
