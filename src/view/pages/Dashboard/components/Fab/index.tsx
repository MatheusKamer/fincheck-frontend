import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";

export function Fab() {
  return(
    <div className="fixed right-4 bottom-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button
            className="bg-teal-900 h-12 w-12 rounded-full flex items-center justify-center text-white"
          >
            <PlusIcon className="w-6 h-6"/>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item>
            <ExpensesIcon />
            Nova Despesa
          </DropdownMenu.Item>

          <DropdownMenu.Item>
            <IncomeIcon />
            Nova Receita
          </DropdownMenu.Item>

          <DropdownMenu.Item>
            <BankAccountIcon />
            Nova Conta
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  )
}
