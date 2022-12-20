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
import { getFirestore, addDoc, collection, getDocs, getDoc, query, where, deleteDoc, doc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth";
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSEGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
};


//initializing firebase with configs
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


//initializing auth provider
const googleProvider = new GoogleAuthProvider();

//To sign in with google
const loginWithGooglePopup = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        return user;
    } catch (error) {
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

//get all myfav gifs from db
const getAllMyFavGifs = async (setMyFavGifs) => {
    try {

        auth.onAuthStateChanged(async (user) => {

            if (user) {
                const q = query(collection(db, "myfav"), where("uuid", "==", user.uid));
                const docs = await getDocs(q);
                const allFavs = []
                docs.forEach(doc => {
                    let data = doc.data();
                    data['refId'] = doc.id;
                    allFavs.push(data);
                })


                setMyFavGifs(allFavs)

            }
        })

    } catch (error) {
        console.log(error)
    }
}

//method to add giphy to myfav collection
const addGiphyToMyFavourite = async (data) => {
    try {
        auth.onAuthStateChanged(async (user) => {

            if (user) {

                await addDoc(collection(db, "myfav"), {
                    uuid: user.uid,
                    image: data.images.fixed_width_downsampled.url,
                    title: data.title,
                    gid: data.id,
                    guser: data.username

                }).catch(e => console.log(e));
            }
        })



    } catch (error) {
        console.log(error)
    }
}

//function to remove giphy from myfav firestore
const removeGiphyFromMyFav = async (id) => {
    console.log(id)
    try {
        auth.onAuthStateChanged(async (user) => {


            console.log(id)
            await deleteDoc(doc(db, "myfav", id));

        })
    } catch (error) {
        console.log(error)
    }
}

//to create user account with email and password
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        if (res.user) {
            const user = res.user;
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name,
                authProvider: "email",
                email,
            }).catch(e => console.log(e));
        }

        return true
    } catch (err) {
        return false
    }
};

//to send password reset link to the user
const resetPassword = async (email) => {
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
    db,
    loginWithGooglePopup,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    resetPassword,
    logout,

    getAllMyFavGifs,
    addGiphyToMyFavourite,
    removeGiphyFromMyFav
};