// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, get, set, remove, onValue  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getFirestore, setLogLevel, collection, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
// Firebase configs
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
const database = getDatabase();

// Form insert submission handler
function insertSchedule( db, form ) {
    const inputId = document.getElementById(inputId).value;
    const inputTitle = document.getElementById(inputTitle).value;
    const inputHero = document.getElementById(inputHero).value;
    const inputMap = document.getElementById(inputMap).value;
    const inputMode = document.getElementById(inputMode).value;
    const inputFeaturing = document.getElementById(inputFeaturing).value;
    const inputDate = document.getElementById(inputDate).value;
    const inputCode = document.getElementById(inputCode).value;
    var id = stringToIntHash(inputValue);
    try {
        // Save data to Firestore
        set(ref(db, path + id), {
            id: inputId,
            title: inputTitle,
            hero: inputHero,
            map: inputMap,
            mode: inputMode,
            featuring: inputFeaturing, 
            date: inputDate, 
            code: inputCode,
            timestamp: Date.now(),
        });
    } catch (error) {
        console.log("Error: ", error);
    }
    form.reset();
}

// LOAD OPTIONS FOR MAP
const inputMap = document.getElementById("inputMap");
const refMap = ref( database, "maps/" );
get(refMap)
.then((snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.val();
        // Loop through the values
        Object.entries(data).forEach(([key, value]) => {
            const item = data[key]; // Access individual item
            const option = document.createElement("option");
            option.value = item.name; // Assuming each item has a 'value' property
            option.textContent = item.name; // Assuming each item has a 'name' property
            inputMap.appendChild(option);
        });
    } else {
        console.log("No data available");
    }
})
.catch((error) => {
    console.error("Error fetching data:", error);
});

// LOAD OPTIONS FOR MAP
const inputHero = document.getElementById("inputHero");
const refHero = ref( database, "hero/" );
get(refHero)
.then((snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.val();
        // Loop through the values
        Object.entries(data).forEach(([key, value]) => {
            const item = data[key]; // Access individual item
            const option = document.createElement("option");
            option.value = item.name; // Assuming each item has a 'value' property
            option.textContent = item.name; // Assuming each item has a 'name' property
            inputHero.appendChild(option);
        });
    } else {
        console.log("No data available");
    }
})
.catch((error) => {
    console.error("Error fetching data:", error);
});

// LOAD OPTIONS FOR MAP
const inputPlayer = document.getElementById("inputPlayer");
const refPlayer = ref( database, "player/" );
get(refPlayer)
.then((snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.val();
        // Loop through the values
        Object.entries(data).forEach(([key, value]) => {
            const item = data[key]; // Access individual item
            const option = document.createElement("option");
            option.value = item.name; // Assuming each item has a 'value' property
            option.textContent = item.name; // Assuming each item has a 'name' property
            inputPlayer.appendChild(option);
        });
    } else {
        console.log("No data available");
    }
})
.catch((error) => {
    console.error("Error fetching data:", error);
});

// SCHEDULE
// Form submission handler for schedule
const formSchedule = document.getElementById("formSchedule");
formSchedule.addEventListener("submit", async (e) => {
    e.preventDefault();
    insertSchedule( database , formSchedule ); 
});
