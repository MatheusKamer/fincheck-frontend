import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useRegisterController } from "./useRegisterController";

export function Register() {
  const {handleSubmit, register, errors} = useRegisterController();

  return (
    <>
      <header className="w-full flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Crie sua conta
        </h1>

        <p className="space-x-2 tracking-[-0.5px]">
          <span className="text-gray-700">
            Já possui uma conta?
          </span>

          <Link to={"/login"} className="text-teal-900 font-medium ">
            Fazer login
          </Link>
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-[60px] flex flex-col gap-4"
      >
      <Input
          type="text"
          placeholder="Nome"
          {...register('name')}
        />
        {errors.name &&
          <span>{errors.name.message}</span>
        }

        <Input
          type="email"
          placeholder="E-mail"
          {...register('email')}
        />
        {errors.email &&
          <span>{errors.email.message}</span>
        }

        <Input
          type="password"
          placeholder="Senha"
          {...register('password')}
        />
        {errors.password &&
          <span>{errors.password.message}</span>
        }

        <Button type="submit" className="mt-2">
          Criar conta
        </Button>
      </form>
    </>
  )
}
