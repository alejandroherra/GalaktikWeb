/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { getFirebaseAuth, getFirebaseDb } from "../config/firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = useCallback(async (email, password, name) => {
    const [
      { createUserWithEmailAndPassword, sendEmailVerification },
      { doc, setDoc },
    ] = await Promise.all([
      import("firebase/auth"),
      import("firebase/firestore"),
    ]);

    const auth = await getFirebaseAuth();
    const db = await getFirebaseDb();
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Send verification email
    await sendEmailVerification(result.user);

    // Create user document in Firestore
    await setDoc(doc(db, "users", result.user.uid), {
      email,
      name,
      role: email === "alejandrohs@live.com" ? "admin" : "user",
      plans: [],
      createdAt: new Date(),
    });
    return result;
  }, []);

  const login = useCallback(async (email, password) => {
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    const auth = await getFirebaseAuth();
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  }, []);

  const logout = useCallback(async () => {
    const { signOut } = await import("firebase/auth");
    const auth = await getFirebaseAuth();
    return signOut(auth);
  }, []);

  const resendVerification = useCallback(async () => {
    const { sendEmailVerification } = await import("firebase/auth");
    const auth = await getFirebaseAuth();
    if (auth.currentUser) {
      return sendEmailVerification(auth.currentUser);
    }
    return Promise.reject("No user logged in");
  }, []);

  const resetPassword = useCallback(async (email) => {
    const { sendPasswordResetEmail } = await import("firebase/auth");
    const auth = await getFirebaseAuth();
    return sendPasswordResetEmail(auth, email);
  }, []);

  useEffect(() => {
    let unsubscribe = () => {};
    let isMounted = true;

    const initFirebase = async () => {
      try {
        const { onAuthStateChanged } = await import("firebase/auth");
        const { doc, getDoc, setDoc } = await import("firebase/firestore");
        const auth = await getFirebaseAuth();
        const db = await getFirebaseDb();

        if (!isMounted) return;

        unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          try {
            setUser(currentUser);
            if (currentUser) {
              const isSuperAdmin = currentUser.email?.toLowerCase() === "alejandrohs@live.com";
              const docRef = doc(db, "users", currentUser.uid);
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                const data = docSnap.data();
                if (isSuperAdmin) {
                  const updates = {};
                  if (data.role !== "admin") updates.role = "admin";
                  if (data.name === "User") updates.name = "Alejandro (Admin)";
                  if (Object.keys(updates).length > 0) {
                    await setDoc(docRef, { ...data, ...updates }, { merge: true });
                    Object.assign(data, updates);
                  }
                }
                setUserData(data);
              } else {
                const initialData = {
                  email: currentUser.email,
                  name: currentUser.displayName || "User",
                  role: isSuperAdmin ? "admin" : "user",
                  plans: [],
                  createdAt: new Date(),
                };
                await setDoc(docRef, initialData);
                setUserData(initialData);
              }
            } else {
              setUserData(null);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            setUserData(null);
          } finally {
            setLoading(false);
          }
        });
      } catch (error) {
        console.error("Error initializing Firebase Auth:", error);
        setLoading(false);
      }
    };

    // Delay initialization to keep main thread completely free during critical render path
    const delayInit = () => {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => initFirebase());
      } else {
        setTimeout(initFirebase, 3000);
      }
    };

    if (document.readyState === "complete") {
      delayInit();
    } else {
      window.addEventListener("load", delayInit);
    }

    return () => {
      isMounted = false;
      window.removeEventListener("load", delayInit);
      unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      userData,
      signup,
      login,
      logout,
      resendVerification,
      resetPassword,
      loading,
    }),
    [user, userData, loading, signup, login, logout, resendVerification, resetPassword],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
