import {
  createContext,
  useCallback,
  useEffect,
  useState
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { usersService } from '../services/usersService';
import { localStorageKeys } from '../config/localStorageKeys';
import toast from 'react-hot-toast';
import { PageLoader } from '../../view/components/PageLoader';

interface AuthContextValue {
  signedIn: boolean;
  signin(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storegAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    return !!storegAccessToken; /* Utilizando !! para transformar em boolean */
  });

  const { isError, data, isFetching } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setSignedIn(false);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error('Your session has expired, you need to sign in again.')
      signout()
    }
  }, [isError, signout]);

  if (isFetching) {
    return <PageLoader />
  }

  return (
    <AuthContext.Provider value={{ signedIn, signin, signout }}>
      <h1>{data?.email}</h1>
      {children}
    </AuthContext.Provider>
  );
}
