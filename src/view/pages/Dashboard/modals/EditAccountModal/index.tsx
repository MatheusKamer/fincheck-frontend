import { Controller } from "react-hook-form";
import { useEditAccountModalController } from "./useEditAccountModalController";
import { Modal } from "../../../../components/Modal";
import { Input } from "../../../../components/Input";
import { Select } from "../../../../components/Select";
import { Button } from "../../../../components/Button";
import { InputCurrency } from "../../../../components/InputCurrency";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";

export function EditAccountModal() {
  const {
    closeEditAccountModal,
    isEditAccountModalOpen,
    register,
    errors,
    handleSubmit,
    control,
    isLoading
  } = useEditAccountModalController()

  return (
    <Modal
      title="Editar conta"
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo inicial</span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px]">R$</span>
              <Controller
                control={control}
                name="initialBalance"
                defaultValue="0"
                render={({ field: { onChange, value } }) => (
                  <InputCurrency
                    error={errors.initialBalance?.message}
                    onChange={onChange}
                    value={value}
                  />
                )}
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

          <Controller
            name="type"
            control={control}
            defaultValue="CHECKING"
            render={({ field: { onChange, value }}) => (
              <Select
                placeholder="Tipo"
                onChange={onChange}
                value={value}
                error={errors.type?.message}
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
            )}
          />

          <Controller
            name="color"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                onChange={onChange}
                value={value}
                error={errors.color?.message}
              />
            )}
          />

        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
            Criar
        </Button>
      </form>
    </Modal>
  )
}
