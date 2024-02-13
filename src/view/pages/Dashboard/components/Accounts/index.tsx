import 'swiper/css';
import { AccountCard } from "./AccountCard";
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';
import { AccountsSliderNavigation } from './AccountsSliderNavigation';
import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { useAccountsController } from './useAccountsController';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { cn } from '../../../../../app/utils/cn';
import { Spinner } from '../../../../components/Spinner';
import { PlusIcon } from '@radix-ui/react-icons';

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toogleValueVisibility,
    isLoading,
    accounts,
    openNewAccountModal,
    currentBalance,
  } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      {isLoading &&
        <div className="h-full w-full flex items-center justify-center">
          <Spinner className="fill-white text-teal-900 w-10 h-10"/>
        </div>
      }

      {!isLoading &&
      <>
        <div>
          <span className="text-white tracking-[-0.5] block">
            Saldo total
          </span>

          <div className="flex items-center gap-2">
            <strong className={cn(
              "text-2xl tracking-[-0.5px] text-white",
              !areValuesVisible && "blur-md"
            )}>
              {formatCurrency(currentBalance)}
            </strong>

            <button
              className="w-8 h-8 flex items-center justify-center"
              onClick={toogleValueVisibility}
            >
              <EyeIcon open={!areValuesVisible} />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-end mt-10">
          {accounts.length === 0 && (
            <>
              <div className="mb-4" slot="container-start">
                <span className="text-white tracking-[-0.5px] text-lg">
                  Minhas contas
                </span>
              </div>

              <button
                onClick={openNewAccountModal}
                className="mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col items-center justify-center gap-4 text-white"
              >
                <div className="w-11 h-11 rounded-full border-2 border-dashed flex items-center justify-center">
                  <PlusIcon className="w-6 h-6"/>
                </div>
                <span
                  className="tracking-[-0.5px] font-medium block w-32 text-center"
                >
                  Cadastre uma nova conta
                </span>
              </button>
            </>
          )}

          {accounts.length > 0 &&
            <div>
              <Swiper
                spaceBetween={16}
                slidesPerView={windowWidth >= 500 ? 3.1 : 1.2}
                onSlideChange={swiper => {
                  setSliderState({
                    isBeginning: swiper.isBeginning,
                    isEnd: swiper.isEnd
                  });
                }}
              >
                <div className="flex items-center justify-between mb-4" slot="container-start">
                  <span className="text-white tracking-[-0.5px] text-lg">
                    Minhas contas
                  </span>

                  <AccountsSliderNavigation
                    isBeginning={sliderState.isBeginning}
                    isEnd={sliderState.isEnd}
                  />
                </div>

                {accounts.map(account => (
                  <SwiperSlide
                    key={account.id}
                  >
                    <AccountCard data={account} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          }
        </div>
      </>}
    </div>
  )
}
