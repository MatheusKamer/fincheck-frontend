import { useNewTransactionModalController } from "./useNewTransactionModalController";
import { Modal } from "../../../../components/Modal";
import { Input } from "../../../../components/Input";
import { Button } from "../../../../components/Button";
import { Select } from "../../../../components/Select";
import { InputCurrency } from "../../../../components/InputCurrency";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Controller } from "react-hook-form";

export function NewTransactionModal() {
  const {
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    newTransactionType,
    control,
    errors,
    handleSubmit,
    register,
    accounts,
    categories,
    isLoading
  } = useNewTransactionModalController()

  const isExpense = newTransactionType === 'EXPENSE';

  return (
    <Modal
      title={isExpense ? 'Nova Despensa' : 'Nova Receita'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Valor {isExpense ? 'da despesa' : 'da receita'}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px]">R$</span>
            <Controller
                control={control}
                name="value"
                defaultValue="0"
                render={({ field: { onChange, value } }) => (
                  <InputCurrency
                    error={errors.value?.message}
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
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            defaultValue=""
            control={control}
            name="categoryId"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Categoria"
                onChange={onChange}
                value={value}
                error={errors.categoryId?.message}
                options={categories.map(category => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />

          <Controller
            defaultValue=""
            control={control}
            name="bankAccountId"
            render={({ field: { onChange, value }}) => (
              <Select
                placeholder={isExpense ? 'Pagar com' : 'Receber com'}
                onChange={onChange}
                value={value}
                error={errors.bankAccountId?.message}
                options={accounts.map(account => ({
                  value: account.id,
                  label: account.name
                }))}
              />
            )}
          />

          <Controller
            defaultValue={new Date()}
            control={control}
            name="date"
            render={({ field: { value, onChange }}) => (
              <DatePickerInput
                error={errors.date?.message}
                onChange={onChange}
                value={value}
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
