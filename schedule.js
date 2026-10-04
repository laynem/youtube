// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
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

// Read through the SDK so the signed-in user's token is sent (required by database.rules.json)
get(ref(database, "hero/"))
            .then(snapshot => {
                const data = snapshot.val() || {};
                // Convert JSON data to an array for DataTables
                const tableData = Object.keys(data).map(key => {
                    const hero = data[key];
                    return [hero.name, hero.type, hero.timestamp];
                });

                // Initialize the DataTable
                const table = new DataTable("#example", {
                    ordering: false,
                    paging: false,
                    searching: false,
                    data: tableData,
                    columns: [
                        { title: "#" },
                        { title: "Title" },
                        { title: "Hero" },
                        { title: "Hero Type" },
                        { title: "Map" },
                        { title: "Mode" },
                        { title: "Featuring" },
                        { title: "Date" },
                        { title: "Code" },
                        { title: "Release Date" }
                    ]
                });
            })
            .catch(error => console.error('Error fetching data:', error));
