
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection,getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyCtyjx5KCl6y5KIf1neWE__qKeE85Pbfkk",
  authDomain: "netflix-clone-fceae.firebaseapp.com",
  projectId: "netflix-clone-fceae",
  storageBucket: "netflix-clone-fceae.firebasestorage.app",
  messagingSenderId: "260586656523",
  appId: "1:260586656523:web:f68e4a5d900fe479fdc80e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const  user = res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider : "local",
            email,
        });
    } catch (error) {
        console.log(error);
          toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}



const login =async(email,password)=>{
 try {
  await signInWithEmailAndPassword(auth,email,password)
 } catch (error) {
    console.log(error);
     toast.error(error.code.split('/')[1].split('-').join(" "));
 }   
}


const logout = ()=>{
    signOut(auth);
}

export {
    auth,db,login,signup,logout
}