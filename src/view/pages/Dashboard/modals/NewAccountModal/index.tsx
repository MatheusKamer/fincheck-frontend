import { useNewAccountModalController } from "./useNewAccountModalController";
import { Modal } from "../../../../components/Modal";
import { Input } from "../../../../components/Input";
import { Select } from "../../../../components/Select";
import { Button } from "../../../../components/Button";
import { InputCurrency } from "../../../../components/InputCurrency";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";

export function NewAccountModal() {
  const {
    closeNewAccountModal,
    isNewAccountModalOpen,
    register,
    errors,
    handleSubmit
  } = useNewAccountModalController()

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo inicial</span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px]">R$</span>
            <InputCurrency
              error={errors.initialBalance?.message}
              {...register('initialBalance')}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da conta"
            error={errors.name?.message}
            {...register('name')}
          />

          <Select
            placeholder="Tipo"
            error={errors.type?.message}
            {...register('type')}
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

          <ColorsDropdownInput
            error={errors.color?.message}
            {...register('color')}
          />
        </div>

        <Button type="submit" className="w-full mt-6">
            Criar
        </Button>
      </form>
    </Modal>
  )
}
