// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import {
    getFirestore,
    setLogLevel,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { 
    getAuth, 
    signInWithPopup,
    GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDG2yH066S224ShC8PN27uv0eQYfNPwMa4",
    authDomain: "fir-b6113.firebaseapp.com",
    databaseURL: "https://fir-b6113-default-rtdb.firebaseio.com",
    projectId: "fir-b6113",
    storageBucket: "fir-b6113.firebasestorage.app",
    messagingSenderId: "975424791293",
    appId: "1:975424791293:web:51703a22f18a8845c91494",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const auth = getAuth();
    
const googleLogin = document.getElementById('googleButton');
googleLogin.addEventListener("click", function() {
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log(credential, token, user);
        window.location.href = "dashboard.html";
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
});