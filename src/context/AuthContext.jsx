import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = async (email, password, name) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);

        // Send verification email
        await sendEmailVerification(result.user);

        // Create user document in Firestore
        await setDoc(doc(db, "users", result.user.uid), {
            email,
            name,
            role: email === 'alejandrohs@live.com' ? 'admin' : 'user',
            plans: [],
            createdAt: new Date()
        });
        return result;
    };

    const login = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result;
    };

    const logout = () => {
        return signOut(auth);
    };

    const resendVerification = () => {
        if (auth.currentUser) {
            return sendEmailVerification(auth.currentUser);
        }
        return Promise.reject("No user logged in");
    };

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
                setUser(currentUser);
                if (currentUser) {
                    // Force Admin Role for Super Admin
                    const isSuperAdmin = currentUser.email?.toLowerCase() === 'alejandrohs@live.com';

                    // Fetch additional user data from Firestore
                    const docRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        // If super admin, override role in state (and optionally update DB if needed)
                        if (isSuperAdmin) {
                            const updates = {};
                            if (data.role !== 'admin') updates.role = 'admin';
                            if (data.name === 'User') updates.name = 'Alejandro (Admin)'; // Auto-fix name

                            if (Object.keys(updates).length > 0) {
                                await setDoc(docRef, { ...data, ...updates }, { merge: true });
                                Object.assign(data, updates);
                            }
                        }
                        setUserData(data);
                    } else {
                        // If user exists in Auth but not in Firestore
                        const initialData = {
                            email: currentUser.email,
                            name: currentUser.displayName || 'User',
                            role: isSuperAdmin ? 'admin' : 'user',
                            plans: [],
                            createdAt: new Date()
                        };
                        await setDoc(docRef, initialData);
                        setUserData(initialData);
                    }
                } else {
                    setUserData(null);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                // Fallback: allow app to load even if Firestore fails
                setUserData(null);
            } finally {
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    const value = {
        user,
        userData,
        signup,
        login,
        logout,
        resendVerification,
        resetPassword,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
