import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

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
  logout: () => void;
  isAuthenticated: boolean;
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

const USER_STORAGE_KEY = "user-profile-data";
const AUTH_STORAGE_KEY = "user-authenticated";

export function UserProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check if user is authenticated from localStorage
    if (typeof window !== "undefined") {
      try {
        const authStatus = localStorage.getItem(AUTH_STORAGE_KEY);
        return authStatus === "true";
      } catch (error) {
        console.error("Error loading auth status from localStorage:", error);
      }
    }
    return false;
  });

  const [user, setUser] = useState<User>(() => {
    // Load user data from localStorage on initialization
    if (typeof window !== "undefined") {
      try {
        const savedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          return { ...defaultUser, ...parsedUser };
        }
      } catch (error) {
        console.error("Error loading user data from localStorage:", error);
      }
    }
    return defaultUser;
  });

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } catch (error) {
        console.error("Error saving user data to localStorage:", error);
      }
    }
  }, [user]);

  // Save auth status to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, isAuthenticated.toString());
      } catch (error) {
        console.error("Error saving auth status to localStorage:", error);
      }
    }
  }, [isAuthenticated]);

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => {
      const updatedUser = { ...prev, ...updates };
      return updatedUser;
    });
  };

  const updateProfileImage = (imageUrl: string | null) => {
    setUser((prev) => {
      const updatedUser = { ...prev, profileImage: imageUrl };
      return updatedUser;
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Clear user data and auth status from localStorage
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } catch (error) {
        console.error("Error clearing data from localStorage:", error);
      }
    }
    // Redirect to login page
    window.location.href = "/login";
  };

  // Auto-authenticate when user successfully completes OTP verification
  const authenticateUser = () => {
    setIsAuthenticated(true);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        updateProfileImage,
        logout,
        isAuthenticated,
      }}
    >
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
  // Return the actual profile image if it exists, otherwise return empty string
  // This will cause the Avatar component to fall back to the AvatarFallback
  return user.profileImage || "";
}
