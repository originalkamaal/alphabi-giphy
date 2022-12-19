import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSEGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
};

console.log(import.meta.env.VITE_API_KEY);

//initializing firebase with configs
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//initializing auth provider
const googleProvider = new GoogleAuthProvider();

//To sign in with google
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        return user;
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

//to sginin user with email and password
const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        if (err) {

            return false
        }
    }
    return true
};


//to create user account with email and password
const registerWithEmailAndPassword = async (email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        if (res.user)

            return true
    } catch (err) {
        return false
    }
};

//to send password reset link to the user
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

//to remove the user session to logout the user
const logout = () => {
    signOut(auth);
};

export {
    auth,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};