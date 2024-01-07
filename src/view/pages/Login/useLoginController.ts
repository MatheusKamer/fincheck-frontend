import { useForm } from 'react-hook-form';

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSumit,
  } = useForm();

  const handleSubmit = hookFormHandleSumit((data) => {
    console.log({data});
  });

  return { handleSubmit, register }
}
