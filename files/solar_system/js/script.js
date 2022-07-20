// константы
const scene = new THREE.Scene();
const container = document.getElementById('container');
const camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 0.1, 2000 );
const renderer = new THREE.WebGLRenderer();
const aLight = new THREE.AmbientLight( 0xffffff, 0.1, 1000 );
const pLight = new THREE.PointLight( 0xffffff, 1, 1200 );
const controls = new THREE.OrbitControls( camera, renderer.domElement );

// данные
const data = {
    0: [ 'солнце', 'звезда нашей солнечной системы',
    '1,989×10^30', '1392', '1,4', '5500', '4,57' ],
    1: [ 'меркурий', 'первая планета',
    '3,3×10^23', '4,87', '5,43', 'макс. +480 мин. -180', '58,65', '0,387', '0,24' ],
    2: [ 'Венера', 'вторая планета',
    '4,87×10^24', '12,1','5,25', 'макс. +480 мин. -', '243', '0,723', '0,62' ],
    2.1: [ 'Нейт', 'спутник венеры',
    '', '' ],
    3: [ 'земля', 'третья планета',
    '5,976×10^24', '12,756', '5,518', 'макс. +58 мин. -90', '1', '1', '1' ],
    3.1: [ 'луна', 'спутник земли',
    '384,4', '3474,8' ],
    4: [ 'марс', 'четвертая планета',
    '6,4×10^23', '6,67', '3,95', 'макс. 0 мин. -150', '1,03', '1,5237', '1,88' ],
    4.1: [ 'фобос', 'спутник марса',
    '9,378', '18,4×26,8' ],
    4.2: [ 'деймос', 'спутник марса',
    '23,459', '10,4×15' ],
    5: [ 'юпитер', 'пятая планета',
    '1,9×10^27', '143,76', '1,31', 'макс. -160 мин. -160', '0,41', '5,2', '11,86' ],
    5.1: [ 'Ио', 'спутник юпитера',
    '422,6', '3660' ],
    6: [ 'сатурн', 'шестая планета',
    '5,68×10^26', '120,42', '0,71', 'макс. -150 мин. -150', '0,44', '9,54', '29,46' ],
    7: [ 'уран', 'седьмая планета',
    '8,7×10^25', '51,3', '1,27', 'макс. -220 мин. -220', '0,72', '19,2', '84' ],
    8: [ 'нептун', 'восьмая планета',
    '1×10^26', '49,5', '1,77', 'макс. -213 мин. -213', '0,74', '30', '165' ],
    9: [ 'плутон', 'девятая планета',
    '1,3×10^22', '2,32', '2', 'макс. -230 мин. -230', '6,4', '39,4', '247,7' ],
};

const rotateSpeed = {
    sun: 0.0005,
    mercury: 0.00241,
    venus: 0.00615,
    earth: 0.01,
        moon: 0.1,
    mars: 0.01881,
        phobos: 0.1,
        deimos: 0.1,
    jupiter: 0.01186,
        io: 0.1,
    saturn: 0.02946,
        saturnRing: 0.1,
    uranus: 0.08402,
        uranusRing: 0.1,
    neptune: 0.1648,
    pluto: 0.2477
};

const rotateSunSpeed = {
    mercury: 0.0014349,
    venus: 0.0010497,
    earth: 0.0008928,
    mars: 0.0007233,
    jupiter: 0.0003915,
    saturn: 0.0002892,
    uranus: 0.000204,
    neptune: 0.0001629,
    pluto: 0.0001419
};

const rotatePlanetSpeed = {
    moon: 0.009,
    phobos: 0.02,
    deimos: 0.01,
    io: 0.01,
    uranusRing: 0.2,
    saturnRing: 0.2
};

// настройки
camera.position.set( 0, 200, 300 );

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 1 );
container.appendChild( renderer.domElement );

scene.add( pLight );
scene.add( aLight );

controls.enableDamping = true;

window.addEventListener( 'resize', function () {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize( width, height );
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
} );

// обработчик действий
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove ( event ) {
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
};

function letBody () {
    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( scene.children );
    if ( intersects[ 0 ].object.name != 'stars' ) {
        for ( let i = 0; i < intersects.length; i ++ ) {
            rotateBool = false;
	    }
    }
}

function resetBody () {
    for ( let i = 0; i < scene.children.length; i ++ ) {
        if ( scene.children[ i ] ) {
            rotateBool = true;
        }
	}
}

let show = false;

function selectBody () {
    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( scene.children );
    if ( intersects.length > 0 ) {
        if ( show ) {
            document.querySelector( '.card' ).remove();
            show = false;
        }
        if ( intersects[ 0 ].object.name != 'stars' && intersects[ 0 ].object.name != 0 && intersects[ 0 ].object.name % 1 == 0 ) {
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `<h1 class="card__title">${ data[ intersects[ 0 ].object.name ][ 0 ] }</h1>
                             <h2 class="card__sub-title">${ data[ intersects[ 0 ].object.name ][ 1 ] }</h2>
                             <p class="card__text">масса (кг): ${ data[ intersects[ 0 ].object.name ][ 2 ] }</p>
                             <p class="card__text">диаметр (тыс.км): ${ data[ intersects[ 0 ].object.name ][ 3 ] }</p>
                             <p class="card__text">плотность (г/см3): ${ data[ intersects[ 0 ].object.name ][ 4 ] }</p>
                             <p class="card__text">температура (°C): ${ data[ intersects[ 0 ].object.name ][ 5 ] }</p>
                             <p class="card__text">длина суток (земные сутки): ${ data[ intersects[ 0 ].object.name ][ 6 ] }</p>
                             <p class="card__text">среднее расстояние от солнца (а.е.): ${ data[ intersects[ 0 ].object.name ][ 7 ] }</p>
                             <p class="card__text">период обращение по орбите (год): ${ data[ intersects[ 0 ].object.name ][ 8 ] }</p>`;
            container.append( div );

            show = true;
        } else if ( intersects[ 0 ].object.name == 0 ) {
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `<h1 class="card__title">${ data[ intersects[ 0 ].object.name ][ 0 ] }</h1>
                             <h2 class="card__sub-title">${ data[ intersects[ 0 ].object.name ][ 1 ] }</h2>
                             <p class="card__text">масса (кг): ${ data[ intersects[ 0 ].object.name ][ 2 ] }</p>
                             <p class="card__text">диаметр (тыс.км): ${ data[ intersects[ 0 ].object.name ][ 3 ] }</p>
                             <p class="card__text">плотность (г/см3): ${ data[ intersects[ 0 ].object.name ][ 4 ] }</p>
                             <p class="card__text">температура (°C): ${ data[ intersects[ 0 ].object.name ][ 5 ] }</p>
                             <p class="card__text">возраст (млрд.лет): ${ data[ intersects[ 0 ].object.name ][ 6 ] }</p>`;
            container.append( div );

            show = true;
        } else if ( intersects[ 0 ].object.name % 1 != 0 ) {
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `<h1 class="card__title">${ data[ intersects[ 0 ].object.name ][ 0 ] }</h1>
                             <h2 class="card__sub-title">${ data[ intersects[ 0 ].object.name ][ 1 ] }</h2>
                             <p class="card__text">радиус орбиты (тыс.км): ${ data[ intersects[ 0 ].object.name ][ 2 ] }</p>
                             <p class="card__text">диаметр (км): ${ data[ intersects[ 0 ].object.name ][ 3 ] }</p>`;
            container.append( div );

            show = true;
        }
    }
}

window.addEventListener( 'mousemove', onPointerMove );
window.addEventListener( 'click', selectBody );
window.addEventListener( 'keydown', function ( event ) {
    if ( event.key == 'Escape' ) {
        if ( show ) {
            document.querySelector( '.card' ).remove();
            show = false;
        }
        controls.target.set( 0, 0, 0 );
        camera.position.set( 0, 200, 300 );
    }
} );

// функции
function createPlanet ( size, url, pos, name ) {
    const texture = new THREE.TextureLoader().load( url );
    const geo = new THREE.SphereGeometry( size, 100, 100 );
    const mat = new THREE.MeshStandardMaterial( { map: texture } );
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    mesh.name = name;
    console.log( 'создана планета ' + mesh.name );
    obj.add( mesh );
    mesh.position.x = pos;
    scene.add( obj );

    return { mesh, obj, pos };
}

function createSat ( size, url, pos, planet, name ) {
    const texture = new THREE.TextureLoader().load( url );        
    const geo = new THREE.SphereGeometry( size, 100, 100 );
    const mat = new THREE.MeshStandardMaterial( { map: texture } );
    const mesh = new THREE.Mesh( geo, mat );
    const obj = new THREE.Object3D();
    const obj2 = new THREE.Object3D();
    mesh.name = name;
    console.log( 'создан спутник ' + mesh.name );
    obj.position.x = planet.pos;
    mesh.position.x = pos;
    obj.add( mesh );
    obj2.add( obj );
    scene.add( obj2 );

    return { mesh, obj, obj2 };
}

function createRing ( inRad, outRad, rot, url, planet ) {
    const texture = new THREE.TextureLoader().load( url );
    const geo = new THREE.RingGeometry( inRad, outRad, 100 );
    const mat = new THREE.MeshStandardMaterial( { map: texture, side: THREE.DoubleSide } );
    const mesh = new THREE.Mesh( geo, mat );
    const obj = new THREE.Object3D();
    mesh.rotation.x = rot;
    mesh.position.x = planet.pos;
    obj.add( mesh );
    scene.add( obj );

    return { mesh, obj };
}

// элементы
const sunTexture = new THREE.TextureLoader().load( 'img/sun.jpg' );
const sunGeo = new THREE.SphereGeometry( 50, 100, 100 );
const sunMat = new THREE.MeshBasicMaterial( { map: sunTexture } );
const sun = new THREE.Mesh(sunGeo, sunMat);
sun.name = 0;
scene.add( sun );

const mercury = createPlanet(3, 'img/mercury.jpg', 80, 1 );
const venus = createPlanet(4.2, 'img/venus.jpg', 120, 2 );
const earth = createPlanet(4, 'img/earth.jpg', 160, 3 );
    const moon = createSat(1, 'img/moon.jpg', 10, earth, 3.1 );
const mars = createPlanet(3.6, 'img/mars.jpg', 200, 4 );
    const phobos = createSat(1, 'img/phobos.jpg', 6, mars, 4.1 );
    const deimos = createSat(0.5, 'img/deimos.jpg', 9, mars, 4.2 );
const jupiter = createPlanet(9, 'img/jupiter.jpg', 240, 5 );
    const io = createSat(1, 'img/io.jpg', 13, jupiter, 5.1 );
const saturn = createPlanet(7, 'img/saturn.jpg', 280, 6 );
    const saturnRing = createRing(8, 13, 45, 'img/saturnRing.jpg', saturn );
const uranus = createPlanet(6, 'img/uranus.jpg', 300, 7 );
    const uranusRing = createRing(6, 15, 45, 'img/uranusRing.jpg', uranus );
const neptune = createPlanet(5, 'img/neptune.jpg', 340, 8 );
const pluto = createPlanet(2, 'img/pluto.jpg', 360, 9 );

const spaceTexture = new THREE.TextureLoader().load( 'img/space.jpg' );
const starGeo = new THREE.SphereGeometry( 700, 100, 100 );
const starMat = new THREE.MeshStandardMaterial( { map: spaceTexture, side: THREE.BackSide, transparent: true } );
const starMesh = new THREE.Mesh( starGeo, starMat );
starMesh.name = 'stars';
scene.add( starMesh );

let rotateBool = true;

// функция анимации
function animate() {
    if ( rotateBool ) {
        sun.rotateY( rotateSpeed.sun );
        mercury.mesh.rotateY( rotateSpeed.mercury );
        mercury.obj.rotateY( rotateSunSpeed.mercury );
        venus.mesh.rotateY( rotateSpeed.venus );
        venus.obj.rotateY( rotateSunSpeed.venus );
        earth.mesh.rotateY( rotateSpeed.earth );
        earth.obj.rotateY( rotateSunSpeed.earth );
            moon.mesh.rotateY( rotateSpeed.moon );
            moon.obj2.rotateY( rotateSunSpeed.earth );
            moon.obj.rotateY( rotatePlanetSpeed.moon );
        mars.mesh.rotateY( rotateSpeed.mars );
        mars.obj.rotateY( rotateSunSpeed.mars );
            phobos.mesh.rotateY( rotateSpeed.phobos );
            phobos.obj2.rotateY( rotateSunSpeed.mars );
            phobos.obj.rotateY( rotatePlanetSpeed.phobos ); 
            deimos.mesh.rotateY( rotateSpeed.deimos );
            deimos.obj2.rotateY( rotateSunSpeed.mars );
            deimos.obj.rotateY( rotatePlanetSpeed.deimos );  
        jupiter.mesh.rotateY( rotateSpeed.jupiter );
        jupiter.obj.rotateY( rotateSunSpeed.jupiter );
            io.mesh.rotateY( rotateSpeed.io );
            io.obj2.rotateY( rotateSunSpeed.jupiter );
            io.obj.rotateY( rotatePlanetSpeed.io );
        saturn.mesh.rotateY( rotateSpeed.saturn );
        saturn.obj.rotateY( rotateSunSpeed.saturn );
            saturnRing.mesh.rotateZ( rotatePlanetSpeed.saturnRing );
            saturnRing.obj.rotateY( rotateSunSpeed.saturn );
        uranus.mesh.rotateY( rotateSpeed.uranus );
        uranus.obj.rotateY( rotateSunSpeed.uranus );
            uranusRing.mesh.rotateZ( rotatePlanetSpeed.uranusRing );
            uranusRing.obj.rotateY( rotateSunSpeed.uranus );
        neptune.mesh.rotateY( rotateSpeed.neptune );
        neptune.obj.rotateY( rotateSunSpeed.neptune );
        pluto.mesh.rotateY( rotateSpeed.pluto );
        pluto.obj.rotateY( rotateSunSpeed.pluto );
    };

    controls.update();
    resetBody();
    letBody();
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
};

animate();