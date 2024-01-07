import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

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

  const handleSubmit = hookFormHandleSumit((data) => {
    console.log('Chamar API com: ', data);

  });

  return { handleSubmit, register, errors }
}
