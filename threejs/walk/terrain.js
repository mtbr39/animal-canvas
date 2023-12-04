

// シーンの作成
const scene = new THREE.Scene();

// カメラの作成
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// レンダラーの作成
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 地形生成用のパラメータ
const terrainSize = 10;
const terrainSubdivision = 63;

// 地形生成
const terrainMesh = new Terrain({
  easing: Terrain.Linear,
  heightmap: Terrain.PerlinDiamond,
  material: new THREE.MeshStandardMaterial({ color: 0x77ff77 }),
  maxHeight: 1,
  minHeight: -1,
  steps: terrainSubdivision,
  useBufferGeometry: false,
  xSegments: terrainSubdivision,
  xSize: terrainSize,
  ySegments: terrainSubdivision,
  ySize: terrainSize,
});

scene.add(terrainMesh);

// 草のテクスチャ
const grassTexture = new THREE.TextureLoader().load('path/to/grass_texture.jpg');

// 草のマテリアル
const grassMaterial = new THREE.PointsMaterial({
  color: 0x00ff00,
  size: 0.1,
  map: grassTexture,
  transparent: true,
});

// 草のジオメトリ
const grassGeometry = new THREE.BufferGeometry();

// 草のパーティクルをランダムに配置
const grassPositions = [];
for (let i = 0; i < 1000; i++) {
  const x = Math.random() * terrainSize - terrainSize / 2;
  const y = Math.random() * 0.2; // 地形の高さより少し上に配置
  const z = Math.random() * terrainSize - terrainSize / 2;

  grassPositions.push(x, y, z);
}

grassGeometry.setAttribute('position', new THREE.Float32BufferAttribute(grassPositions, 3));

// 草のパーティクルシステム
const grassParticles = new THREE.Points(grassGeometry, grassMaterial);
scene.add(grassParticles);

// レンダリングループ
const animate = function () {
  requestAnimationFrame(animate);

  // 地形をアニメーションさせる場合、ここで地形を変更

  renderer.render(scene, camera);
};

animate();
