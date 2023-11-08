var camera, scene, renderer;
var world, ground, controls;
var cannonControls;
var cube, cubeBody;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0,
};
var cameraSpeed = 0.1; // 移動速度

init();
animate();

function init() {
    // シーンの作成
    scene = new THREE.Scene();

    // カメラの作成
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    // カメラの位置を調整
    camera.position.set(0, 2, 5); // X, Y, Z の位置を設定

    // カメラの注視点を設定
    camera.lookAt(0, 0, 0); // カメラの注視点を原点に設定

    // 夕日のようなオレンジ色の背景色を設定
    scene.background = new THREE.Color(0xffa500); // オレンジ色

    // レンダラーの作成
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // #################################################### CANNON

    world = new CANNON.World();
    world.gravity.set(0, -9.82, 0); // 重力を設定

    var groundShape = new CANNON.Plane();
    ground = new CANNON.Body({ mass: 0 });
    ground.addShape(groundShape);
    ground.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.add(ground);

    var cubeGeometry = new THREE.BoxGeometry();
    // var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 1, 0); // 高さ1の位置に設定
    scene.add(cube);

    var cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
    cubeBody = new CANNON.Body({ mass: 1 });
    cubeBody.addShape(cubeShape);
    world.add(cubeBody);

    camera.position.z = 5;
    // cannonControls = new THREE.OrbitControls(camera, renderer.domElement);
    cannonControls = new CannonCameraController(camera, world, camera.position);

    // ####################################################

    // 地面を作成
    var groundGeometry = new THREE.PlaneGeometry(1000, 1000);
    var groundMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });

    // 地面の法線ベクトルを調整
    groundGeometry.rotateX(-Math.PI / 2); // X軸を中心に90度回転

    var ground = new THREE.Mesh(groundGeometry, groundMaterial);
    scene.add(ground);

    // アンビエントライトの設定
    var ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // シャドウマップを有効化
    renderer.shadowMap.enabled = true;

    // ディレクショナルライトの設定
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7); // ライトの位置を変更
    scene.add(directionalLight);

    // シャドウマップの設定
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    // directionalLight.shadow.map.dispose(); // 以前のシャドウマップを破棄

    // 影の色をオレンジ色に設定
    directionalLight.shadow.map = new THREE.WebGLRenderTarget(1024, 1024, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false,
    });

    // シャドウマップのマテリアルに影響するライトの色を設定
    directionalLight.shadow.color = new THREE.Color(1, 0.5, 0); // オレンジ色（R: 1, G: 0.5, B: 0）

    // 影の明るさを調整
    // directionalLight.shadow.bias = -0.005; // シャドウ バイアス
    // directionalLight.shadow.radius = 2; // シャドウのぼかし

    // ディレクショナルライトをシャドウキャスターに設定
    directionalLight.castShadow = true;

    // シャドウマップの設定
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;

    // シャドウカメラの設定
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 100;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;

    // 立方体にシャドウキャスターの設定を追加
    cube.castShadow = true;

    // 地面にシャドウレシーバーの設定を追加
    ground.receiveShadow = true;

    // ... 他の設定は省略 ...

    // document.addEventListener("keydown", onKeyDown);
    // document.addEventListener("keyup", onKeyUp);

    // document.addEventListener("mousedown", onMouseDown);
    // document.addEventListener("mousemove", onMouseMove);
    // document.addEventListener("mouseup", onMouseUp);

    // Pointer Lock API を使ってマウスキャプチャを設定
    var element = document.body;
    element.requestPointerLock =
        element.requestPointerLock ||
        element.mozRequestPointerLock ||
        element.webkitRequestPointerLock;
    document.addEventListener("click", function () {
        element.requestPointerLock();
    });
}

// function onKeyDown(event) {
//     switch (event.key) {
//         case "w":
//             moveForward = true;
//             break;
//         case "s":
//             moveBackward = true;
//             break;
//         case "a":
//             moveLeft = true;
//             break;
//         case "d":
//             moveRight = true;
//             break;
//     }
// }

// function onKeyUp(event) {
//     switch (event.key) {
//         case "w":
//             moveForward = false;
//             break;
//         case "s":
//             moveBackward = false;
//             break;
//         case "a":
//             moveLeft = false;
//             break;
//         case "d":
//             moveRight = false;
//             break;
//     }
// }

// function onMouseDown(event) {
//     isDragging = true;
//     previousMousePosition = {
//         x: event.clientX,
//         y: event.clientY,
//     };
// }

// function onMouseMove(event) {
//     if (isDragging) {
//         var deltaMove = {
//             x: event.clientX - previousMousePosition.x,
//             y: event.clientY - previousMousePosition.y,
//         };

//         var sensitivity = 0.005; // 回転感度
//         var euler = new THREE.Euler(0, 0, 0, "YXZ");
//         euler.setFromQuaternion(camera.quaternion);

//         euler.y -= deltaMove.x * sensitivity;
//         euler.x -= deltaMove.y * sensitivity;

//         var maxVerticalAngle = Math.PI / 4; // 上向きの最大角度 (ここでは45度)
//         euler.x = Math.max(
//             -maxVerticalAngle,
//             Math.min(maxVerticalAngle, euler.x)
//         );

//         camera.quaternion.setFromEuler(euler);

//         previousMousePosition = {
//             x: event.clientX,
//             y: event.clientY,
//         };
//     }
// }

// function onMouseUp() {
//     isDragging = false;
// }

function animate() {
    requestAnimationFrame(animate);

    cannonControls.update();

    // Three.jsのオブジェクトをCannon.jsの位置に更新
    cube.position.copy(cubeBody.position);
    cube.quaternion.copy(cubeBody.quaternion);

    // // Cannon.jsのコントロールをアップデート
    // cannonControls.update();

    // ... 他のアニメーション処理 ...

    renderer.render(scene, camera);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}
