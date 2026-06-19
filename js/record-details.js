import { db }
from "./firebase-config.js";

import {
doc,
getDoc
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const params =
new URLSearchParams(
window.location.search
);

const id = params.get("id");

loadRecord();

async function loadRecord(){

try{

const snap =
await getDoc(
doc(db,"vaultRecords",id)
);

if(!snap.exists()){

document.getElementById(
"recordDetails"
).innerHTML =
"<h2>Record Not Found</h2>";

return;

}

const data = snap.data();

let statusClass = "";

switch(data.status){

case "In Storage":
statusClass = "in-storage";
break;

case "Released":
statusClass = "released";
break;

case "Awaiting Release":
statusClass = "awaiting";
break;

case "Under Verification":
statusClass = "verification";
break;

}

document.getElementById(
"recordDetails"
).innerHTML = `

<div class="report-card">

<div class="report-header">

<h1>SecureTrust Vault International</h1>

<p>Official Asset Verification Report</p>

</div>

<div class="section">

<h3>Tracking Information</h3>

<div class="info-row">
<strong>Tracking Number:</strong>
${data.trackingNumber}
</div>

</div>

<div class="section">

<h3>Client Information</h3>

<div class="info-row">
<strong>Client Name:</strong>
${data.clientName}
</div>

<div class="info-row">
<strong>Phone Number:</strong>
${data.phoneNumber}
</div>

<div class="info-row">
<strong>Home Address:</strong>
${data.homeAddress}
</div>

</div>

<div class="section">

<h3>Asset Information</h3>

<div class="info-row">
<strong>Description:</strong>
${data.itemDescription}
</div>

<div class="info-row">
<strong>Category:</strong>
${data.category}
</div>

<div class="info-row">
<strong>Quantity:</strong>
${data.quantity}
</div>

<div class="info-row">
<strong>Weight:</strong>
${data.weight} KG
</div>

</div>

<div class="section">

<h3>Storage Information</h3>

<div class="info-row">
<strong>Storage Location:</strong>
${data.storageLocation}
</div>

<div class="info-row">
<strong>Date Received:</strong>
${data.dateReceived}
</div>

<div class="info-row">
<strong>Status:</strong>

<span class="status-badge ${statusClass}">
${data.status}
</span>

</div>

</div>

<div class="section">

<h3>Official Remarks</h3>

<p>${data.remarks}</p>

</div>

<div class="actions">

<button
class="print-btn"
onclick="window.print()">

Print Report

</button>

<button
class="edit-btn"
onclick="window.location.href='edit-record.html?id=${id}'">

Edit Record

</button>

</div>

</div>

`;

}
catch(error){

console.error(error);

document.getElementById(
"recordDetails"
).innerHTML =
error.message;

}

}