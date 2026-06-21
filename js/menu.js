const menuToggle =
document.getElementById("menuToggle");

const mobileNav =
document.getElementById("mobileNav");

menuToggle.addEventListener(
"click",
() => {

mobileNav.classList.toggle(
"active"
);

}
);

const navLinks =
mobileNav.querySelectorAll("a");

navLinks.forEach(link => {

link.addEventListener(
"click",
() => {

mobileNav.classList.remove(
"active"
);

}
);

});