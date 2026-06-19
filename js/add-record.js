import { db, storage } from "./firebase-config.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-storage.js";

const form = document.getElementById("vaultForm");
const message = document.getElementById("message");

form.addEventListener("submit", saveRecord);

function generateTrackingNumber() {
  const year = new Date().getFullYear();

  const random = Math.floor(
    100000 + Math.random() * 900000
  );

  return `STVI-${year}-${random}`;
}

async function saveRecord(e) {
  e.preventDefault();

  const trackingNumber = generateTrackingNumber();

  try {

    let imageUrl = "";

    const imageInput =
      document.getElementById("assetImage");

    const imageFile =
      imageInput?.files?.[0];

    if (imageFile) {

      const imageRef = ref(
        storage,
        `vault-assets/${Date.now()}-${imageFile.name}`
      );

      await uploadBytes(
        imageRef,
        imageFile
      );

      imageUrl = await getDownloadURL(
        imageRef
      );
    }

    await addDoc(
      collection(db, "vaultRecords"),
      {
        trackingNumber,

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

        quantity: Number(
          document.getElementById("quantity").value
        ),

        weight: Number(
          document.getElementById("weight").value
        ),

        storageLocation:
          document.getElementById("storageLocation").value,

        status:
          document.getElementById("status").value,

        remarks:
          document.getElementById("remarks").value,

        dateReceived:
          document.getElementById("dateReceived").value,

        imageUrl,

        createdAt:
          serverTimestamp()
      }
    );

    message.style.color = "green";

    message.innerHTML = `
      ✅ Record Saved Successfully
      <br><br>
      Tracking Number:
      <br>
      <b>${trackingNumber}</b>
    `;

    form.reset();

  } 
 catch (error) {

  console.error("FULL ERROR:", error);

  alert(error.message);

  message.innerHTML = error.message;

}
}