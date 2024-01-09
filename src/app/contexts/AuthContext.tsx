import {
  createContext,
  useCallback,
  useState
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { usersService } from '../services/usersService';
import { localStorageKeys } from '../config/localStorageKeys';

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

  useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setSignedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn, signin, signout }}>
      {children}
    </AuthContext.Provider>
  )
}
