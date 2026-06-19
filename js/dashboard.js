import { db, auth }
from "./firebase-config.js";

import {
collection,
getDocs
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

import {
signOut
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

const logoutBtn =
document.getElementById("logoutBtn");

logoutBtn.addEventListener(
"click",
async()=>{

await signOut(auth);

window.location.href =
"login.html";

});

loadDashboard();

async function loadDashboard(){

const snapshot =
await getDocs(
collection(db,"vaultRecords")
);

let totalAssets = 0;
let inStorage = 0;
let released = 0;
let totalWeight = 0;

snapshot.forEach(doc=>{

const data = doc.data();

totalAssets++;

if(data.status === "In Storage"){
inStorage++;
}

if(data.status === "Released"){
released++;
}

totalWeight += Number(data.weight || 0);

});

document.getElementById(
"totalAssets"
).innerText = totalAssets;

document.getElementById(
"inStorage"
).innerText = inStorage;

document.getElementById(
"released"
).innerText = released;

document.getElementById(
"totalWeight"
).innerText =
totalWeight.toFixed(2)+" kg";

}