"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../types";
import { getCurrentUser } from "../services/AuthService";
import Loading from "../components/UI/Loading";
import { usePathname } from 'next/navigation';

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const PUBLIC_ROUTES = ['/login', '/register', '/auth/forgot-password'];

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const pathname = usePathname();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  const handleUser = async () => {
    try {
      const fetchedUser = await getCurrentUser();

      if (fetchedUser) {
        setUser(fetchedUser);
        setIsLoading(false);
      } else {
        setRetryCount((prev) => prev + 1);
        if (isPublicRoute) {
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setRetryCount((prev) => prev + 1);
      if (isPublicRoute) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isPublicRoute) {
      setIsLoading(false);
      setRetryCount(0);
    } else if (!user) {
      setIsLoading(true);
      const timeoutId = setTimeout(() => {
        handleUser();
      }, retryCount * 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [user, retryCount, pathname]);

  if (isLoading && !user && !isPublicRoute) {
    return <Loading />;
  }

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }
  return context;
};

export default UserProvider;