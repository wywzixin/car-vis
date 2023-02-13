// 引入Three.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let width = window.innerWidth;
let height = window.innerHeight;

let camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(-621, 357, 357);
camera.lookAt(0, 0, 0);
/**
 * 创建渲染器对象
 */
let renderer = new THREE.WebGLRenderer({
    antialias: true, //开启锯齿
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height); //设置渲染区域尺寸

// gltf模型纹理贴图自动加载默认是THREE.sRGBEncoding，注意设置WebGL渲染器和gltf纹理保持一致
renderer.outputEncoding = THREE.sRGBEncoding;

let controls = new OrbitControls(camera, renderer.domElement);

controls.minDistance = 500;

controls.maxDistance = 1200;

// 上下旋转最大值设置
controls.maxPolarAngle = (Math.PI / 2) * 0.9;

window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};
export { renderer, camera };
