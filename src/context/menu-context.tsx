import React, { createContext, useContext, useState } from 'react';

interface MenuContextType {
  menuVisible: boolean;
  setMenuVisible: (visible: boolean) => void;
  filter: 'all' | 'video' | 'image';
  setFilter: (filter: 'all' | 'video' | 'image') => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  loginVisible: boolean;
  setLoginVisible: (visible: boolean) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [filter, setFilter] = useState<'all' | 'video' | 'image'>('all');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  return (
    <MenuContext.Provider
      value={{
        menuVisible,
        setMenuVisible,
        filter,
        setFilter,
        isLoggedIn,
        setIsLoggedIn,
        loginVisible,
        setLoginVisible,
      }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}
