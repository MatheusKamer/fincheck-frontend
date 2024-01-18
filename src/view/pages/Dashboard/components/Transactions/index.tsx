import { SliderOption } from "./SliderOption";
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { useTransactionsController } from "./useTransactionsController";
import { TransactionsSliderNavigation } from "./TransactionsSliderNavigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "../../../../../app/utils/cn";
import { MONTHS } from "../../../../../app/config/constants";
import { Spinner } from "../../../../components/Spinner";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import emptyStateImagem from "../../../../../assets/images/empty-state.svg"
import { FiltersModal } from "./FiltersModal";

export function Transactions() {
  const {
    areValuesVisible,
    transactions,
    isLoading,
    isInitialLoading,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    isFiltersModalOpen
  } = useTransactionsController()

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      {isInitialLoading &&
        <div className="h-full w-full flex items-center justify-center">
          <Spinner className="h-10 w-10"/>
        </div>
      }

      {!isInitialLoading &&
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
          />

          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown />

              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
              >
                <TransactionsSliderNavigation />

                {MONTHS.map((month, index) => (
                <SwiperSlide key={month}>
                  {({ isActive }) => (
                    <SliderOption
                      isActive={isActive}
                      month={month}
                      index={index}
                    />
                  )}
                </SwiperSlide>
                ))}
              </Swiper>

            </div>
          </header>

          <div className="mt-4 space-y-2 flex-1 overflow-y-auto scrollbar">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <Spinner className="w-10 h-10"/>
              </div>
            )}

            {(!hasTransactions && !isLoading) && (
              <div className="flex flex-col items-center justify-center h-full">
                <img src={emptyStateImagem} alt="Empty state" />
                <p className="text-gray-700">
                  Não encontramos nenhuma transação!
                </p>
              </div>
            )}

            {(hasTransactions && !isLoading) && (
              <>
                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon type="expense"/>

                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">Almoço</strong>
                      <span className="text-sm text-gray-600">04/04/2004</span>
                    </div>
                  </div>

                  <span className={cn(
                    "text-red-800 tracking-[-0.5px] font-medium",
                    !areValuesVisible && "blur-md"
                  )}>
                    {formatCurrency(-1000)}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon type="income"/>

                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">Almoço</strong>
                      <span className="text-sm text-gray-600">04/04/2004</span>
                    </div>
                  </div>

                  <span className={cn(
                    "text-green-800 tracking-[-0.5px] font-medium",
                    !areValuesVisible && "blur-md"
                  )}>
                    {formatCurrency(1000)}
                  </span>
                </div>
              </>
            )}
          </div>
        </>
      }
    </div>
  )
}
