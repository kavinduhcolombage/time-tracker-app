import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "../firebase/firebaseConfig";

type AuthProviderProps = {
    children: ReactNode;
}

type AuthContextType = {
    currentUser: User | null;
    loading: boolean;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    console.log("AuthContext rendered");
    console.log("AuthContext loading: ", loading);
    console.log("AuthContext currentUser: ", currentUser);

    useEffect(() => {
        console.log("Setting up onAuthStateChanged listener");
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ currentUser, loading, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}