// js/home-track.js

document
.getElementById("heroTrackBtn")
.addEventListener("click", () => {

const trackingNumber =
document
.getElementById("trackingNumber")
.value
.trim();

if(!trackingNumber){

alert("Please enter a tracking number");

return;

}

window.location.href =
`tracking-result.html?tracking=${trackingNumber}`;

});