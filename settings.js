// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, get, set, remove, } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getFirestore, setLogLevel, } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
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

// Set notification alert
function setAlert( type, msg ) {
    switch (type) {
        case "error":
            $("#alert").addClass("bg-red-100 border border-red-400 text-red-700");
            $("#alert strong").html("Error!");
            $("#alert span.block").html(msg);
            break;
        default:
            $("#alert").addClass("bg-green-100 border border-green-400 text-green-700");
            $("#alert strong").html("Success!");
            $("#alert span.block").html(msg);
    }
    $("#alert").removeClass("hidden");
}

// Convert a string to an integer hash
function stringToIntHash( str ) {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i); // Get the Unicode value of the character
        hash = (hash << 5) - hash + char; // Bitwise operations: hash * 31 + char
        hash |= 0; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

// Load list
function loadList( db, path, list ) {
    const dbRef = ref(db, path);
    $( "ul#list" + list ).html("");
    get(dbRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
        const data = snapshot.val();
        // Loop through the values
        Object.entries(data).forEach(([key, value]) => {
            var mapid = key;
            Object.entries(value).forEach(([key, value]) => {
                if(key == "name") {
                    $( "li#template"+ list +" span" ).attr( "data-id", mapid );
                    $( "li#template"+ list +" p#list"+ list +"Name" ).html(value);
                    $( "li#template"+ list ).clone().appendTo( "ul#list" + list ).removeClass( "hidden" ).removeAttr('id');
                }
            });
        });
        } else {
        console.log("No data available");
        }
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
}

// Load list Hero
function loadListHero( db, path ) {
    const dbRef = ref(db, path);
    $( "ul#listHero" ).html("");
    get(dbRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
        const data = snapshot.val();
        // Loop through the values
        Object.entries(data).forEach(([key, value]) => {
            var heroid = key;
            Object.entries(value).forEach(([key, value]) => {
                if(key == "name") {
                    $( "li#templateHero span" ).attr( "data-id", heroid );
                    $( "li#templateHero p#listHeroName" ).html(value);
                    $( "li#templateHero p#listHeroType" ).html(value);
                    $( "li#templateHero" ).clone().appendTo( "ul#listHero" ).removeClass( "hidden" ).removeAttr('id');
                }
            });
        });
        } else {
        console.log("No data available");
        }
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
}

// Form insert submission handler
function insertList( db, form, path, list, input ) {
    const inputValue = document.getElementById(input).value;
    var id = stringToIntHash(inputValue);
    try {
        // Save data to Firestore
        set(ref(db, path + id), {
            name: inputValue,
            timestamp: Date.now(),
        });
    } catch (error) {
        setAlert( "error", "Error saving text: " + error.message );
    }
    setAlert( "success", "Text saved successfully!" );
    form.reset();
    loadList( db, path, list );
}

function insertListHero( db, form, path, input, type ) {
    console.log("Insert Two");
    const inputValue = document.getElementById(input).value;
    const inputType = document.getElementById(type).value;
    var id = stringToIntHash(inputValue);
    console.log(id, inputValue, inputType);
    try {
        // Save data to Firestore
        set(ref(db, path + id), {
            name: inputValue,
            type: inputType,
            timestamp: Date.now(),
        });
    } catch (error) {
        setAlert( "error", "Error saving text: " + error.message );
    }
    setAlert( "success", "Text saved successfully!" );
    form.reset();
    loadListHero( db, path );
}

// Delete button handler
$(document).on("click", ".listDelete", function () { 
    // Retrieve the data-path attribute from the clicked button
    const id = $(this).attr("data-id");
    const path = $(this).attr("data-path");

    // Reference the Firebase node
    const dbRef = ref(database, path + id);

    // Delete the data
    remove(dbRef)
    .then(() => {
        setAlert( "success", "Data at deleted successfully!" );
    })
    .catch((error) => {
        setAlert( "error", error );
    });

    loadList(database);
});

// MAPS
// Form submission handler for map
const formMap = document.getElementById("formMap");
formMap.addEventListener("submit", async (e) => {
    e.preventDefault();
    insertList( database , formMap, "maps/", "Map", "mapName" ); 
});

loadList( database , "maps/", "Map" );

// HERO
// Form submission handler for hero
const formHero = document.getElementById("formHero");
formHero.addEventListener("submit", async (e) => {
    e.preventDefault();
    insertListHero( database , formHero, "hero/", "heroName", "heroType" ); 
});

loadListHero( database , "hero/" );

// PLAYER
const formPlayer = document.getElementById("formPlayer");
formPlayer.addEventListener("submit", async (e) => {
    e.preventDefault();
    insertList( database , formPlayer, "player/", "playerName" ); 
});

loadList( database , "player/", "Player" );
