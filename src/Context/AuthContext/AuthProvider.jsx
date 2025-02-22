import { createContext, useEffect, useState } from "react";
import { app } from "../../Firebase/firebase.config";
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logOutUser = () => {
        setUser(null);
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            console.log(user);
        });
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        auth, provider, user, setUser, loading, setLoading, logOutUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;