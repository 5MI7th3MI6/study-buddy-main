'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@/lib/types'


const UserDataContext = createContext<User | undefined>(undefined);

// Define a provider component
export const UserDataProvider: React.FC<{ data: User, children: ReactNode }> = ({ data, children }) => {
  const [userData, setUserData] = useState<User>({
    username: "",
    avatar_url: ""
  });

  useEffect(() => {
    setUserData(data);
  }, [data]);

  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
};

//
export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};
