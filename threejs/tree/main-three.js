//線形補間
const lerp = (x, y, p) => {
    return x + (y - x) * p;
};
//ノーマライズ
const norm = (x, y, p) => {
    return (p - x) / (y - x);
};
const limit = (x, min, max) => {
    if (x < min) {
        return min;
    }
    if (max < x) {
        return max;
    }
    return x;
};

// ページの読み込みを待つ
window.addEventListener("load", init);

// サイズを指定
const width = 960;
const height = 540;
//変数定義
let smoothScrollY = 0;

function init() {
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#myCanvas"),
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0xf0efe0, 1);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 0, +1000);

    // //グループ バックアップ
    // const treeGroup = new THREE.Group();
    // scene.add(treeGroup);

    // const sphere01 = new THREE.Mesh(
    //     new THREE.SphereGeometry(200, 30, 30),
    //     new THREE.MeshStandardMaterial({ color: 0x226f54 })
    // );
    // sphere01.position.x = 30;
    // sphere01.position.y = 150;
    // treeGroup.add(sphere01);

    // const sphere02 = new THREE.Mesh(
    //     new THREE.SphereGeometry(150, 30, 30),
    //     new THREE.MeshStandardMaterial({ color: 0x226f54 })
    // );
    // sphere02.position.x = -120;
    // sphere02.position.y = 60;
    // treeGroup.add(sphere02);

    // const cylinder01 = new THREE.Mesh(
    //     new THREE.CylinderGeometry(20, 50, 500, 32),
    //     new THREE.MeshBasicMaterial({ color: 0x43291f })
    // );
    // cylinder01.position.y = -100;
    // treeGroup.add(cylinder01);

    // const cylinder02 = new THREE.Mesh(
    //     new THREE.CylinderGeometry(10, 20, 200, 32),
    //     new THREE.MeshBasicMaterial({ color: 0x43291f })
    // );
    // cylinder02.rotation.z = 0.5;
    // cylinder02.position.x = -60;
    // cylinder02.position.y = -100;
    // treeGroup.add(cylinder02);

    //グループ
    const treeGroup = new THREE.Group();
    scene.add(treeGroup);

    const sphere01 = new THREE.Mesh(
        new THREE.SphereGeometry(200, 30, 30),
        new THREE.MeshStandardMaterial({ color: 0x226f54 })
    );
    sphere01.position.x = 30;
    sphere01.position.y = 150;
    treeGroup.add(sphere01);

    const sphere02 = new THREE.Mesh(
        new THREE.SphereGeometry(150, 30, 30),
        new THREE.MeshStandardMaterial({ color: 0x226f54 })
    );
    sphere02.position.x = -120;
    sphere02.position.y = 60;
    treeGroup.add(sphere02);

    const cylinder01 = new THREE.Mesh(
        new THREE.CylinderGeometry(20, 50, 500, 32),
        new THREE.MeshBasicMaterial({ color: 0x43291f })
    );
    cylinder01.rotation.z = -0.1;
    cylinder01.position.x = 30;
    cylinder01.position.y = -100;
    treeGroup.add(cylinder01);

    const cylinder02 = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 20, 200, 32),
        new THREE.MeshBasicMaterial({ color: 0x43291f })
    );
    cylinder02.rotation.z = 0.5;
    cylinder02.position.x = -40;
    cylinder02.position.y = -100;
    treeGroup.add(cylinder02);

    // // 平行光源
    // const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    // directionalLight.position.set(2, 2, 3);
    // scene.add(directionalLight);
    //環境光源
    const light = new THREE.AmbientLight(0xf0efe0, 1.0);
    scene.add(light);

    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
        // メッシュを回転させる
        treeGroup.rotation.y -= 0.02;

        //スクロール
        let scrollY = window.scrollY;

        smoothScrollY = lerp(smoothScrollY, scrollY, 0.05);
        // console.log(scrollY, smoothScrollY);

        //スクロール依存
        cylinder01.scale.y = limit(norm(400, 3000, smoothScrollY), 0, 1);
        cylinder02.scale.y = limit(norm(2000, 4000, smoothScrollY), 0, 1);
        sphere01.scale.x = limit(norm(1500, 6000, smoothScrollY), 0, 1);
        sphere01.scale.y = limit(norm(1500, 6000, smoothScrollY), 0, 1);
        sphere01.scale.z = limit(norm(1500, 6000, smoothScrollY), 0, 1);
        sphere02.scale.x = limit(norm(3500, 6000, smoothScrollY), 0, 1);
        sphere02.scale.y = limit(norm(3500, 6000, smoothScrollY), 0, 1);
        sphere02.scale.z = limit(norm(3500, 6000, smoothScrollY), 0, 1);

        // レンダリング
        renderer.render(scene, camera);

        requestAnimationFrame(tick);
    }

    // 初期化のために実行
    onResize();
    // リサイズイベント発生時に実行
    window.addEventListener("resize", onResize);

    function onResize() {
        // サイズを取得
        const width = window.innerWidth;
        const height = window.innerHeight;

        // レンダラーのサイズを調整する
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        // カメラのアスペクト比を正す
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
}
