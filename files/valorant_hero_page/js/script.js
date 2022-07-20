const swiper = new Swiper('.swiper', {
  loop: false,
});


const cards = Array.from( document.querySelectorAll( ".agents__card" ) );
const abilities = document.querySelector( ".agents__ability-faq" );

const clearActiveClass = ( element ) => {
  element.find(item => item.classList.remove( 'agents__card--active' ) );
}

const setActiveClass = ( element, index ) => {
  element[ index ].classList.add( 'agents__card--active' );
}

const checkout = ( item, index ) => {
  item.addEventListener( 'click', () => {
    clearActiveClass( cards );
    setActiveClass( cards, index );
    changeAbilities( cards, index );
  } );
}

// const findActive = (  ) => {
//   const active = document.querySelectorAll( '.agents__card--active' );
//   console.log( active );
//   if ( active.length == 0 ) {
//     abilities.classList.add( 'dn' );
//   } else {
//     abilities.classList.remove( 'dn' );
//   }
// }

const changeAbilities = ( item, index ) => {
  const abilitiesImgs = document.querySelectorAll( '.agents__ability-icon' );
  const cardImgs = item[ index ].querySelectorAll( '.agents__icon' );
  abilitiesImgs[ 0 ].src = cardImgs[ 0 ].src;
  abilitiesImgs[ 1 ].src = cardImgs[ 2 ].src;
  abilitiesImgs[ 2 ].src = cardImgs[ 3 ].src;
}


cards.forEach( checkout );