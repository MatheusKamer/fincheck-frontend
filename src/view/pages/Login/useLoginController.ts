import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { httpClient } from '../../../app/services/httpClient';

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Report a valid email'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must be 8 characters')
})

type FormData = z.infer<typeof schema>

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSumit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookFormHandleSumit(async (data) => {
    await httpClient.post('/auth/signin', data)
  });

  return { handleSubmit, register, errors }
}
