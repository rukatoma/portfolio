const target = document.querySelector( '.burger' );
const menu = document.querySelector( '.nav' );
const bg = document.querySelectorAll( '.main__background' );
const body = document.body;

target.addEventListener( 'click', () => {
    if ( menu.style.height != '120px' ) {
        target.classList.add( 'burger--active' );
        menu.style.height = '120px';
        bg[0].style.margin = '120px 0 0 0';
        bg[1].style.margin = '120px 0 0 0';
    } else {
        target.classList.remove( 'burger--active' );
        menu.style.height = '0';
        bg[0].style.margin = '0 0 0 0';
        bg[1].style.margin = '0 0 0 0';
    }
} );



const slider = document.querySelector( '.example__slider' );
const before = slider.querySelector( '.example__before' );
const after = slider.querySelector( '.example__after' );
const beforeImg = before.querySelector( '.example__img' );
const afterImg = after.querySelector( '.example__img' );
const change = slider.querySelector( '.example__change' );
const changeLine = slider.querySelector( '.example__change__line' );
const changeHandler = slider.querySelector( '.example__change__handler' );
const text = slider.querySelectorAll( '.example__change__text' );

// let isActive = false;

// // body.addEventListener( 'DOMContentLoaded', () => {
// //     let width = slider.offsetWidth;
// //     beforeImg.style.width = `${width}px`;
// // } );

// const beforeAfterSlider = ( x ) => {
//     let shift = Math.max( 0, Math.min( x, slider.offsetWidth ) );
//     let sliderWidth = slider.offsetWidth;
//     let changeLineWidth = changeLine.offsetWidth;
//     let width = (sliderWidth / changeLineWidth) / 2;
//     let ratio = changeLineWidth / sliderWidth;
//     changeHandler.style.right = `${ shift }px`;
//     shift /= ratio;
//     before.style.width = `${ shift }px`;
// }

// const pauseEvents = ( e ) => {
//     e.stopPropagation();
//     e.preventDefault();
//     return false;
// }

// body.addEventListener( 'mouseleave', () => {
//     isActive = false;
// } );

// changeLine.addEventListener( 'mousedown', () => {
//     isActive = true;
// } );

// changeHandler.addEventListener( 'touchdown', () => {
//     isActive = true;
// } );

// body.addEventListener( 'mouseup', () => {
//     isActive = false;
// } );

// body.addEventListener( 'mousemove', (e) => {
//     if ( !isActive ) {
//         return
//     } 

//     let x = e.pageX;

//     x -= changeLine.getBoundingClientRect().left;
//     beforeAfterSlider(x);
// } );

text[0].addEventListener( 'click', () => {
    afterImg.style.opacity = '0';
    before.style.width = `100%`;
    changeHandler.style.left = '6px';
    changeHandler.style.transform = 'translate(0, -50%)';
} );

text[1].addEventListener( 'click', () => {
    afterImg.style.opacity = '1';
    before.style.width = `0`;
    changeHandler.style.left = 'calc(100% - 6px)';
    changeHandler.style.transform = 'translate(-100%, -50%)';
} );