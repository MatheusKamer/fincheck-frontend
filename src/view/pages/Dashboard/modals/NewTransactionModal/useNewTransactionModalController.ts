import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/services/transactionsService";
import toast from "react-hot-toast";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";

const schema = z.object({
  name: z.string().min(1, 'Informe o nome'),
  value: z.string().min(1, 'Informe o valor'),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a conta'),
  date: z.date(),
})

type FormData = z.infer<typeof schema>

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const { isLoading, mutateAsync } = useMutation(transactionsService.create);

  const handleSubmit = hookFormHandleSubmit( async data => {
    try {
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['transactions']})
      toast.success(
        newTransactionType === 'EXPENSE'
        ? 'Despesa cadastrada com sucesso!'
        : 'Receita cadastrada com sucesso!'
      );
      closeNewTransactionModal();
      reset({
        value: "0",
        categoryId: "",
        bankAccountId: "",
        name: "",
      });
    } catch {
      toast.error(
        newTransactionType === 'EXPENSE'
        ? 'Erro ao cadastrar despesa!'
        : 'Erro ao cadastrar receita!'
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === newTransactionType)
  }, [categoriesList, newTransactionType])

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading
  }
}
