import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query';
import { authService } from '../../../app/services/authService';
import { SigninParams } from '../../../app/services/authService/signin';
import { useAuth } from '../../../app/hooks/useAuth';

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Report a valid email'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must be 8 characters')
})

type FormData = z.infer<typeof schema>

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
  })

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const {accessToken} = await mutateAsync(data)

      signin(accessToken);
    } catch {
      toast.error('Invalid credentials!')
    }
  })

  return { handleSubmit, register, errors, isLoading }
}
