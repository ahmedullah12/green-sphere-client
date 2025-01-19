'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useUser } from './user.provider';

const SocketContext = createContext<Socket | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const {user} = useUser();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (user?._id) {
      const socketInstance = io("https://green-sphere-server.onrender.com", {
        withCredentials: true,
      });

      socketInstance.on('connect', () => {
        console.log('Socket connected');
        socketInstance.emit('join', user._id);
      });

      socketInstance.on('connect_error', (error: any) => {
        console.error('Socket connection error:', error);
      });

      setSocket(socketInstance);

      return () => {
        socketInstance.close();
      };
    }
  }, [user?._id]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);