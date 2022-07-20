const items = document.querySelectorAll( '.types__item' );
const textContent = document.querySelectorAll( '.block__content' );
const data = document.querySelectorAll( '.data' );

const i1 = items[ 0 ];
const i2 = items[ 1 ];
const i3 = items[ 2 ];
const i4 = items[ 3 ];

ScrollReveal().reveal( textContent , { delay: 300 } );
ScrollReveal().reveal( data , { delay: 100 } );
ScrollReveal().reveal( i1 , { delay: 200 } );
ScrollReveal().reveal( i2 , { delay: 300 } );
ScrollReveal().reveal( i3 , { delay: 400 } );
ScrollReveal().reveal( i4 , { delay: 500 } );


const nav = document.querySelector( '.nav' );
const burger = document.querySelector( '.burger' );
const header = document.querySelector( '.header' );
const headerBody = document.querySelector( '.header__body' );
const headerNav = document.querySelector( '.header__nav' );
const body = document.querySelector( 'body' );

burger.onclick = () => {
    burger.classList.toggle( 'burger--active' );
    nav.classList.toggle( 'nav--active' );
    headerBody.classList.toggle( 'header__body--active' );
    headerNav.classList.toggle( 'header__nav--active' );
}