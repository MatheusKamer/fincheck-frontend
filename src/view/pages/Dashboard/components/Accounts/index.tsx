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

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toogleValueVisibility
  } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      <div>
        <span className="text-white tracking-[-0.5] block">
          Saldo total
        </span>

        <div className="flex items-center gap-2">
          <strong className={cn(
            "text-2xl tracking-[-0.5px] text-white",
            !areValuesVisible && "blur-md"
          )}>
            {formatCurrency(1000)}
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

            <SwiperSlide>
              <AccountCard
                color="#7950F2"
                name="Nubank"
                balance={1000}
                type="CASH"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                color="#0f0"
                name="Sicredi"
                balance={2000}
                type="CHECKING"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                color="#333"
                name="XP"
                balance={3000}
                type="INVESTMENT"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                color="#333"
                name="XP"
                balance={3000}
                type="INVESTMENT"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  )
}
