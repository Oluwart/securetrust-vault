import { db }
from "./firebase-config.js";

import {
collection,
getDocs,
deleteDoc,
doc
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const table =
document.getElementById("recordsTable");

const searchInput =
document.getElementById("searchInput");

let allRecords = [];

loadRecords();

async function loadRecords(){

const snapshot =
await getDocs(
collection(db,"vaultRecords")
);

allRecords = [];

snapshot.forEach(document=>{

allRecords.push({

id: document.id,

...document.data()

});

});

displayRecords(allRecords);

}

function displayRecords(records){

table.innerHTML = "";

records.forEach(record=>{

const row = document.createElement("tr");

row.innerHTML = `

<td>${record.trackingNumber}</td>

<td>${record.clientName}</td>

<td>${record.itemDescription}</td>

<td>

<span class="status ${
record.status === "In Storage"
? "in-storage"
: "released"
}">

${record.status}

</span>

</td>

<td>

<button
class="action-btn view-btn"
onclick="viewRecord('${record.id}')">

View

</button>

<button
class="action-btn edit-btn"
onclick="editRecord('${record.id}')">

Edit

</button>

<button
class="action-btn delete-btn"
onclick="deleteRecord('${record.id}')">

Delete

</button>

</td>

`;

table.appendChild(row);

});

}

searchInput.addEventListener(
"keyup",
filterRecords
);

function filterRecords(){

const value =
searchInput.value.toLowerCase();

const filtered =
allRecords.filter(record =>

record.trackingNumber
.toLowerCase()
.includes(value)

||

record.clientName
.toLowerCase()
.includes(value)

);

displayRecords(filtered);

}

window.deleteRecord =
async function(id){

const confirmDelete =
confirm(
"Delete this record?"
);

if(!confirmDelete) return;

await deleteDoc(
doc(db,"vaultRecords",id)
);

loadRecords();

};

window.viewRecord =
function(id){

window.location.href =
`record-details.html?id=${id}`;

};

window.editRecord =
function(id){

window.location.href =
`edit-record.html?id=${id}`;

};