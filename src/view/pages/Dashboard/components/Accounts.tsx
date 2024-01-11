import 'swiper/css';
import { AccountCard } from "./AccountCard";
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';
import { AccountsSliderNavigation } from './AccountsSliderNavigation';
import { EyeIcon } from "../../../components/icons/EyeIcon";

export function Accounts() {
  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      <div>
        <span className="text-white tracking-[-0.5] block">
          Saldo total
        </span>

        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-0.5px] text-white">
            R$ 1000,00
          </strong>

          <button className="w-8 h-8 flex items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={3.1}
          >
            <div className="flex items-center justify-between mb-4" slot="container-start">
              <span className="text-white tracking-[-0.5px] text-lg">
                Minhas contas
              </span>

              <AccountsSliderNavigation />
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
