import { db }
from "./firebase-config.js";

import {
collection,
query,
where,
getDocs
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const trackBtn =
document.getElementById("trackBtn");

trackBtn.addEventListener(
"click",
trackAsset
);

async function trackAsset(){

const trackingNumber =
document.getElementById(
"trackingNumber"
).value.trim();

const result =
document.getElementById(
"result"
);

result.innerHTML =
"Searching...";

try{

const q = query(
collection(db,"vaultRecords"),
where(
"trackingNumber",
"==",
trackingNumber
)
);

const snapshot =
await getDocs(q);

if(snapshot.empty){

result.innerHTML =
`
<h2>
Tracking Number Not Found
</h2>
`;

return;

}

snapshot.forEach(doc=>{

const data = doc.data();

result.innerHTML = `

<div class="tracking-card">

<div class="card-header">

<h2>SecureTrust Vault International</h2>

<p>Vault Asset Verification Report</p>

</div>

<div class="status-badge ${getStatusClass(data.status)}">

${data.status}

</div>

<div class="details-grid">

<div>
<strong>Tracking Number</strong>
<p>${data.trackingNumber}</p>
</div>

<div>
<strong>Client Name</strong>
<p>${data.clientName}</p>
</div>

<div>
<strong>Phone Number</strong>
<p>${data.phoneNumber}</p>
</div>

<div>
<strong>Category</strong>
<p>${data.category}</p>
</div>

<div>
<strong>Item Description</strong>
<p>${data.itemDescription}</p>
</div>

<div>
<strong>Quantity</strong>
<p>${data.quantity}</p>
</div>

<div>
<strong>Weight</strong>
<p>${data.weight} KG</p>
</div>

<div>
<strong>Date Received</strong>
<p>${data.dateReceived}</p>
</div>

<div>
<strong>Storage Location</strong>
<p>${data.storageLocation}</p>
</div>

</div>

<div class="remarks-box">

<strong>Official Remarks</strong>

<p>${data.remarks}</p>

${
data.imageUrl
?
`
<div class="asset-image">

<img
src="${data.imageUrl}"
alt="Stored Asset">

</div>
`
:
""
}

</div>

</div>

`;

});

}
catch(error){

result.innerHTML =
error.message;

}

}

function getStatusClass(status){

switch(status){

case "In Storage":
return "green";

case "Released":
return "red";

case "Awaiting Release":
return "orange";

case "Under Verification":
return "blue";

default:
return "gray";

}

}