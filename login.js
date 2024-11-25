import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { 
    getAuth, 
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        const userName = user.displayName;
        document.getElementById("userName").innerHTML = userName;
    } else {
        window.location.href("index.html");
    }   
})
const googleLogout = document.getElementById('googleLogout');
googleLogout.addEventListener("click", function() {
    signOut(auth).then(() => {
    // Sign-out successful.
    console.log("User signed out successfully");
    }).catch((error) => {
    // An error happened.
    console.error("Error signing out:", error);
    });
});