const firebaseConfig = {
    apiKey: "AIzaSyDwYvwj5_ZKmf1PmHA221npnFrAHt-UqpE",
    authDomain: "galaktik-20f9f.firebaseapp.com",
    projectId: "galaktik-20f9f",
    storageBucket: "galaktik-20f9f.firebasestorage.app",
    messagingSenderId: "552838900544",
    appId: "1:552838900544:web:1d75fec6c95eead20aa8a5",
    measurementId: "G-JE29TZNQFS"
};

let _appPromise = null;
let _db = null;
let _auth = null;

// Eager module is avoided on purpose: firebase/* must stay OUT of the
// entry chunk so pages load zero firebase code until it is really needed.
export function getFirebaseApp() {
    if (!_appPromise) {
        _appPromise = import("firebase/app").then(
            ({ initializeApp, getApps }) => {
                const existing = getApps();
                return existing.length ? existing[0] : initializeApp(firebaseConfig);
            }
        );
    }
    return _appPromise;
}

export async function getFirebaseDb() {
    if (!_db) {
        const [{ getFirestore }, app] = await Promise.all([
            import("firebase/firestore"),
            getFirebaseApp(),
        ]);
        _db = getFirestore(app);
    }
    return _db;
}

export async function getFirebaseAuth() {
    if (!_auth) {
        const [{ getAuth }, app] = await Promise.all([
            import("firebase/auth"),
            getFirebaseApp(),
        ]);
        _auth = getAuth(app);
    }
    return _auth;
}