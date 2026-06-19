import { db }
from "./firebase-config.js";

import {
doc,
getDoc,
updateDoc
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const params =
new URLSearchParams(
window.location.search
);

const id = params.get("id");

async function loadRecord(){

const snap =
await getDoc(
doc(db,"vaultRecords",id)
);

const data = snap.data();

document.getElementById("clientName").value =
data.clientName;

document.getElementById("phoneNumber").value =
data.phoneNumber;

document.getElementById("homeAddress").value =
data.homeAddress;

document.getElementById("itemDescription").value =
data.itemDescription;

document.getElementById("category").value =
data.category;

document.getElementById("quantity").value =
data.quantity;

document.getElementById("weight").value =
data.weight;

document.getElementById("storageLocation").value =
data.storageLocation;

document.getElementById("status").value =
data.status;

document.getElementById("remarks").value =
data.remarks;

document.getElementById("dateReceived").value =
data.dateReceived;

}

loadRecord();

document
.getElementById("vaultForm")
.addEventListener(
"submit",
updateRecord
);

async function updateRecord(e){

e.preventDefault();

await updateDoc(
doc(db,"vaultRecords",id),
{

clientName:
document.getElementById("clientName").value,

phoneNumber:
document.getElementById("phoneNumber").value,

homeAddress:
document.getElementById("homeAddress").value,

itemDescription:
document.getElementById("itemDescription").value,

category:
document.getElementById("category").value,

quantity:
Number(
document.getElementById("quantity").value
),

weight:
Number(
document.getElementById("weight").value
),

storageLocation:
document.getElementById("storageLocation").value,

status:
document.getElementById("status").value,

remarks:
document.getElementById("remarks").value,

dateReceived:
document.getElementById("dateReceived").value

});

alert("Record Updated Successfully");

window.location.href =
"view-records.html";

}