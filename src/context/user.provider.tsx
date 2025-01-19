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

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const handleUser = async () => {
    try {
      const fetchedUser = await getCurrentUser();

      if (fetchedUser) {
        setUser(fetchedUser);
        setIsLoading(false);
      } else {
        setRetryCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setRetryCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!user) {
      const timeoutId = setTimeout(() => {
        handleUser();
      }, retryCount * 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [user, retryCount]);

  if (isLoading && !user) {
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
