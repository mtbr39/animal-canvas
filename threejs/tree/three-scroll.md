# [three.js] スクロールで3Dオブジェクトを変化させる

## three.jsの基本（シーン作成から3Dオブジェクト描写まで）



### シーン・カメラ作成
HTML
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <script src="three.js"></script>
  <script src="main.js"></script>
</head>
<body>
  <canvas id="targetCanvas"></canvas>
</body>
</html>
```
シーンとカメラ
```js
window.addEventListener("DOMContentLoaded", init);

function init() {
  const width = 960;
  const height = 540;

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#targetCanvas")
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    width / height,
    1,
    10000
  );
  camera.position.set(0, 0, +1000);

}
```

### 3Dオブジェクト作成

ジオメトリとマテリアルを作成
シーンに追加
光源を作成
シーンに追加
```js
  const geometry = new THREE.BoxGeometry(500, 500, 500);
  const material = new THREE.MeshStandardMaterial({
    color: 0x0000ff
  });
  const box = new THREE.Mesh(geometry, material);
  scene.add(box);

  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);

  scene.add(light);
```
アニメーション
```js
  tick();

  function tick() {
    requestAnimationFrame(tick);

    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    renderer.render(scene, camera);
  }
```

### 画面いっぱいにCanvasを表示する

## スクロールでオブジェクトを変化させる

### スクロール量を取得する

### オブジェクトを変化させる


参考 : 最新版で学ぶThree.js入門 - ICS MEDIA https://ics.media/entry/14771/
