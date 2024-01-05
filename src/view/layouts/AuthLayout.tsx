import { Outlet } from 'react-router-dom'
import illustration from '../../assets/images/illustration.png'
import { Logo } from '../components/Logo'

export function AuthLayout() {
  return (
    <div className='flex w-full h-full'>
      <div className='w-1/2 h-full flex justify-center items-center flex-col gap-16'>
        <Logo className='text-gray-600 h-6'/>

        <div className='w-full max-w-md'>
          <Outlet />
        </div>
      </div>

      <div className='w-1/2 h-full flex justify-center items-center p-8 relative'>
        <img
          src={illustration}
          className='object-cover w-full h-full max-w-[656px] max-h-[960px] select-none rounded-[32px]' alt=''
        />

        <div className='max-w-[656px] bottom-8 bg-white p-10 absolute rounded-b-[32px]'>
          <Logo className='text-teal-900 h-8'/>
          <p className='text-gray-700 font-medium text-base mt-4'>
            Gerencie suas finanças pessoais de uma forma simples com o fincheck, e o melhor, totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  )
}
