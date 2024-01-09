import { z } from 'zod';
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod';
import { authService } from '../../../app/services/authService';
import { SignupParams } from '../../../app/services/authService/signup';
import { useAuth } from '../../../app/hooks/useAuth';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('It is an invalid email'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must be 8 characters')
})

type FormData = z.infer<typeof schema>

export function useRegisterController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
  })

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data)

      signin(accessToken);
    } catch {
      toast.error('This e-mail is already in use')
    }
  })

  return { handleSubmit, register, errors, isLoading }
}
