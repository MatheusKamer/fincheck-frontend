import { Controller } from "react-hook-form";
import { useEditAccountModalController } from "./useEditAccountModalController";
import { Modal } from "../../../../components/Modal";
import { Input } from "../../../../components/Input";
import { Select } from "../../../../components/Select";
import { Button } from "../../../../components/Button";
import { TrashIcon } from "../../../../components/icons/TrashIcon";
import { InputCurrency } from "../../../../components/InputCurrency";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";

export function EditAccountModal() {
  const {
    closeEditAccountModal,
    isEditAccountModalOpen,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount
  } = useEditAccountModalController()

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        onConfirm={handleDeleteAccount}
        title="Tem certeza que deseja excluir essa conta?"
        description="Ao excluir a conta, também serão excluídos todos os registros de receita e despesas relacionados."
        onClose={handleCloseDeleteModal}
      />
    )
  }

  return (
    <Modal
      title="Editar conta"
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      rightAction={(
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-6 h-6 text-red-900"/>
        </button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo inicial</span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px]">R$</span>
              <Controller
                control={control}
                name="initialBalance"
                defaultValue={0}
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
            Salvar
        </Button>
      </form>
    </Modal>
  )
}
