const trackBtn =
document.getElementById("heroTrackBtn");

const trackingInput =
document.getElementById("trackingNumber");

const loader =
document.getElementById("trackingLoader");

trackBtn.addEventListener(
"click",
trackAsset
);

function trackAsset(){

    const trackingNumber =
    trackingInput.value.trim();

    if(!trackingNumber){

        alert(
        "Please enter a tracking number."
        );

        return;
    }

    loader.classList.add("show");

    setTimeout(() => {

        window.location.href =
        `tracking-result.html?tracking=${encodeURIComponent(trackingNumber)}`;

    }, 2500);

}