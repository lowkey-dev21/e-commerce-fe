import React, { createContext, useContext, useEffect, useState } from "react";
import useAuthStore from "../stores/auth";

type User = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
};

type UserContextType = {
  user: User | null;
  setUser: (u: User | null) => void;
  loading: boolean;
  refreshUser: () => Promise<User | null>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: false,
  refreshUser: async () => null,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user: storeUser, setUser: storeSetUser } = useAuthStore();
  const [user, setUser] = useState<User | null>(
    typeof window !== "undefined" && localStorage.getItem("auth_user")
      ? JSON.parse(localStorage.getItem("auth_user") as string)
      : storeUser || null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // keep local user in sync with store
    if (storeUser && JSON.stringify(storeUser) !== JSON.stringify(user)) {
      setUser(storeUser as User);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeUser]);

  const refreshUser = async () => {
    setLoading(true);
    try {
      // Call dedicated /api/auth/me endpoint to fetch current user using cookie
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (!res.ok) {
        // clear user
        storeSetUser(null);
        setUser(null);
        return null;
      }
      const body = await res.json();
      const payload = body?.data ?? body;
      const u = payload?.user ?? null;
      if (u) {
        storeSetUser(u as any);
        setUser(u as any);
      }
      return u as User | null;
    } finally {
      setLoading(false);
    }
  };

  const wrappedSetUser = (u: User | null) => {
    storeSetUser(u);
    setUser(u);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser: wrappedSetUser, loading, refreshUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContext;
