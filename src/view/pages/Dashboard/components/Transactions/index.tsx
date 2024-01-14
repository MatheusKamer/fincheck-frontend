import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { MONTHS } from "../../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { TransactionsSliderNavigation } from "./TransactionsSliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { cn } from "../../../../../app/utils/cn";
import { useTransactionsController } from "./useTransactionsController";
import { Spinner } from "../../../../components/Spinner";

export function Transactions() {
  const { areValuesVisible, isLoading } = useTransactionsController()

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      {isLoading &&
        <div className="h-full w-full flex items-center justify-center">
          <Spinner className="h-10 w-10"/>
        </div>
      }

      {!isLoading &&
        <>
          <header>
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2">
                <TransactionsIcon />
                <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">Transações</span>
                <ChevronDownIcon className="text-gray-900"/>
              </button>

              <button>
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
          </div>
        </>
      }
    </div>
  )
}
