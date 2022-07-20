// функции
function clean ( )  {
    a = '';
    b = '';
    sign = '';
    finish = false;
    board.textContent = '0';

    console.log( 'Очищено' );
}


// переменные и константы
let a = '';
let b = '';
let sign = '';
let finish = '';

const digit = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '%' ];
const action = [ '/', '*', '-', '+' ];


// DOM элементы
const board = document.querySelector( '.calculator__board > .calculator__text' );
const buttons = document.querySelectorAll( '.calculator__button' );


// отслеживание ивентов
for ( let i = 0; i < buttons.length; i++ ) {
    buttons[ i ].onclick = ( event ) => {
        board.textContent = '';

        if ( buttons[ i ] === buttons[0] ) clean();      

        const key = event.target.textContent;

        if ( digit.includes( key ) ) {
            if ( b === '' && sign === '' ) {
                a += key;
                board.textContent = a;
                console.log( a );
            }
            else if ( a !== '' && b !== '' && finish ) {
                b = key;
                finish = false;
                board.textContent = b;
                console.log( b );
            }
            else {
                b += key;
                board.textContent = b;
                console.log( b );
            }
        }
        if ( event.target.classList.contains( 'calculator__division' ) ) {
            console.log( '/' );
            sign = action[0];
            board.textContent = sign;
        }
        if ( event.target.classList.contains( 'calculator__multiply' ) ) {
            console.log( '*' );
            sign = action[1];
            board.textContent = sign;
        }
        if ( event.target.classList.contains( 'calculator__minus' ) ) {
            console.log( '-' );
            sign = action[2];
            board.textContent = sign;
        }
        if ( event.target.classList.contains( 'calculator__plus' ) ) {
            console.log( '+' );
            sign = action[3];
            board.textContent = sign;
        }
        if ( event.target.classList.contains( 'calculator__finish' ) ) {
            if ( b === '' ) b = a;
            switch ( sign ) {
                case '/':
                    if ( b === '0' ) {
                        board.textContent = 'error';
                        a = '';
                        b = '';
                        sign = '';
                        return;
                    }
                    a = String( ( +a ) / ( +b ) );
                    console.log( +a );
                    break;
                case '*':
                    if ( b.indexOf('%') > 0 ) {
                        console.log( +a );
                        a = String( ( +a ) * ( +( b.slice(0, -1) ) / 100 ) );
                        console.log( +a );
                        break;
                    }
                    a = String( ( +a ) * ( +b ) );
                    console.log( +a );
                    break;
                case '-':
                    a = String( ( +a ) - ( +b ) );
                    console.log( +a );
                    break;
                case '+':
                    a = String( ( +a ) + ( +b ) );
                    console.log( +a );
                    break;
            }
            finish = true;
            board.textContent = a;
        }
    }
}