import { auth }
from "./firebase-config.js";

import {
signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

const loginBtn =
document.getElementById("loginBtn");

loginBtn.addEventListener(
"click",
loginUser
);

async function loginUser(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

const message =
document.getElementById("message");

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

message.style.color="green";
message.innerText="Login Successful";

setTimeout(()=>{

window.location.href =
"dashboard.html";

},1000);

}
catch(error){

message.style.color="red";
message.innerText=
error.message;

}

}