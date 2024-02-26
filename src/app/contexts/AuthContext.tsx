import {
  createContext,
  useCallback,
  useEffect,
  useState
} from 'react';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { User } from '../entities/User';
import { usersService } from '../services/usersService';
import { localStorageKeys } from '../config/localStorageKeys';
import { LaunchScreen } from '../../view/components/LaunchScreen';

interface AuthContextValue {
  signedIn: boolean;
  user: User | undefined;
  signin(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storegAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    return !!storegAccessToken; /* Utilizando !! para transformar em boolean */
  });

  const { isError, isSuccess, isFetching, remove, data } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: 600000,
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    remove();

    setSignedIn(false);
  }, [remove]);

  useEffect(() => {
    if (isError) {
      toast.error('Your session has expired, you need to sign in again.')
      signout()
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        user: data,
        signin,
        signout,
      }}
    >
      <LaunchScreen isLoading={isFetching}/>

      {!isFetching && children}
    </AuthContext.Provider>
  );
}
