const nav = document.querySelector(".header__pages");
const burger = document.querySelector(".header__burger");
const container = document.querySelector(".body__inner");

burger.onclick = () => {
    burger.classList.toggle("header__burger--active");
    nav.classList.toggle("header__pages--visible");
}

