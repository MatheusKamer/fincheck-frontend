import { z } from "zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Transaction } from "../../../../../app/entities/Transaction";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";

const schema = z.object({
  name: z.string().min(1, 'Informe o nome'),
  value: z.union([
    z.string().min(1, 'Informe o valor'),
    z.number(),
  ]),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a conta'),
  date: z.date(),
})

type FormData = z.infer<typeof schema>

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void,
) {

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction?.date) : new Date(),
    }
  });

  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const {
    isLoading,
    mutateAsync: updateTransaction
  } = useMutation(transactionsService.update);

  const {
    isLoading: isLoadingDelete,
    mutateAsync: removeTransaction,
  } = useMutation(transactionsService.remove);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSubmit = hookFormHandleSubmit( async data => {
    try {
      await updateTransaction({
        ...data,
        id: transaction!.id,
        type: transaction!.type,
        value: currencyStringToNumber(data.value),
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['transactions']})
      queryClient.invalidateQueries({ queryKey: ['bankAccounts']})
      toast.success(
        transaction?.type === 'EXPENSE'
        ? 'Despesa editada com sucesso!'
        : 'Receita editada com sucesso!'
      );
      onClose();
    } catch {
      toast.error(
        transaction?.type === 'EXPENSE'
        ? 'Erro ao salvar despesa!'
        : 'Erro ao salvar receita!'
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === transaction?.type)
  }, [categoriesList, transaction])

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id)

      queryClient.invalidateQueries({queryKey: ['transactions']})
      queryClient.invalidateQueries({ queryKey: ['bankAccounts']})
      toast.success(
        transaction?.type === 'EXPENSE'
        ? 'Despesa excluida com sucesso!'
        : 'Receita excluida com sucesso!'
      );
      onClose();
    } catch {
      toast.error(
        transaction?.type === 'EXPENSE'
        ? 'Erro ao excluir despesa!'
        : 'Erro ao excluir receita!'
      );
    }
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal
  }
}
