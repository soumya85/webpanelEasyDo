import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  department: string;
  position: string;
  employeeId: string;
  joinDate: string;
  bio: string;
  profileImage: string | null;
  authorityLevel: number;
}

interface UserContextType {
  user: User;
  updateUser: (updates: Partial<User>) => void;
  updateProfileImage: (imageUrl: string | null) => void;
}

const defaultUser: User = {
  id: "1",
  name: "Bhaskar Ghosh",
  email: "bhaskar.ghosh@libertyhighrise.com",
  phone: "+91 98765 43210",
  address: "Mumbai, Maharashtra, India",
  department: "Executive Management",
  position: "Executive Director",
  employeeId: "LH001",
  joinDate: "2018-01-15",
  bio: "Experienced executive director with over 15 years in the industry. Leading digital transformation initiatives and strategic planning for Liberty Highrise.",
  profileImage: null,
  authorityLevel: 1,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const updateProfileImage = (imageUrl: string | null) => {
    setUser((prev) => ({ ...prev, profileImage: imageUrl }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser, updateProfileImage }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

// Helper function to get user initials
export function getUserInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// Helper function to get profile image or fallback
export function getProfileImageSrc(user: User): string {
  return user.profileImage || "/api/placeholder/128/128";
}
