import { initializeApp } from "firebase/app"
import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,

} from "firebase/auth";
import { createContext, useContext, useEffect } from "react";
import {
    getFirestore,
    collection,
    addDoc,
    Timestamp,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    getDoc
} from "firebase/firestore"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_API_ID,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider()

// creating context
const firebaseContext = createContext(null);

// custom hook
export const useFirebase = () => useContext(firebaseContext);

export const FirebaseProvider = ({children}) => {

    const signupUserWithEmailAndPassword = (email, password) => {
        createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then(value =>  console.log("Successfully created user account with email: ", value.user.email))
        .catch((error) => alert(error.message));
    }

    const  loginUserWithEmailAndPassword = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
        .then(value => console.log("User logged in successfully."))
        .catch(error => console.log(error.message));
    }


    const signupWithGoogle = () => {
        signInWithPopup(firebaseAuth, googleProvider)
    }

    const [loggedInUser, setLoggedInUser] = useState(null);
    useEffect(()=>{
        onAuthStateChanged(firebaseAuth, user => {
            user ? setLoggedInUser(user) : setLoggedInUser(null)
        })
    },[])

    const signOutUser = () => {
        signOut(firebaseAuth)
        .then(value => console.log("User logged out successfully!"))
        .catch(error => console.log(error));
    }

    console.log("Users : ", loggedInUser)

    const collectData = async (username, email) => {
        const id = new Date();
        return await addDoc(collection(firestore, 'users'),{
            username,
            addedDate:id,
            email,
            status: 'active',
            userId: id
        })
    }

    const fetchDataFromFirestore = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, 'users'));
            const usersData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log('Users data:', usersData);
            return usersData;
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    };

    const deleteUser = async (userId) => {
        try {
            const userRef = doc(firestore, 'users', userId);

            await deleteDoc(userRef);

            console.log('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const toggleUserStatus = async (userId) => {
        try {
            const userRef = doc(firestore, 'users', userId);

            const userSnap = await getDoc(userRef);
            if (!userSnap.exists()) {
                console.error('User document does not exist');
                return;
            }

            const userData = userSnap.data();
            const currentStatus = userData.status;

            // Toggle the status between 'active' and 'inactive'
            const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

            // Update the status field of the user document
            await updateDoc(userRef, {
                status: newStatus
            });

            console.log('User status toggled successfully');
        } catch (error) {
            console.error('Error toggling user status:', error);
        }
    };


    return (
        <firebaseContext.Provider
            value={{
                signupUserWithEmailAndPassword,
                loginUserWithEmailAndPassword,
                signupWithGoogle,
                loggedInUser,
                signOutUser,
                collectData,
                fetchDataFromFirestore,
                deleteUser,
                toggleUserStatus
            }}
        >
            {children}
        </firebaseContext.Provider>
    )
}
