import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('It is an invalid email'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must be 8 characters')
})

type FormData = z.infer<typeof schema>

export function useRegisterController() {
  const {
    register,
    handleSubmit: hookFormHandleSumit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const handleSubmit = hookFormHandleSumit((data) => {
    console.log('Chamar API com: ', data);
  })

  return { handleSubmit, register, errors }
}
