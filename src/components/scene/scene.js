// 场景总文件
import * as THREE from 'three';
import { model } from './model';
/**
 * 创建场景对象Scene
 */
let scene = new THREE.Scene();
scene.add(model);
/**
 * 光源设置
 */
// 平行光1
let directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);
// 平行光2
let directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);
//环境光
let ambient = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambient);

// Three.js三维坐标轴 三个坐标轴颜色RGB分别对应xyz轴
// let axesHelper = new THREE.AxesHelper(250);
// scene.add(axesHelper);

// 创建一个地面
const geometry = new THREE.PlaneGeometry(6000, 6000);

// 加载瓷砖纹理
let texture = new THREE.TextureLoader().load('model/瓷砖.jpg');
texture.encoding = THREE.sRGBEncoding;

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

texture.repeat.set(12, 12);
const material = new THREE.MeshLambertMaterial({
    color: 0x222222,
    map: texture,
});
let ground = new THREE.Mesh(geometry, material);
ground.rotateX(-Math.PI / 2);
scene.add(ground);

let sphereGroup = new THREE.Group();
let R = 550;
// 创建一个圆柱表示隧道
//参数6设置true，不创建圆柱的两个底面
let geometry2 = new THREE.CylinderGeometry(R * 1.01, R * 1.01, R * 9, 32, 1, true);
let material2 = new THREE.MeshPhongMaterial({
    color: 0x222222,
    side: THREE.BackSide, //背面可见，相机和车都在隧道里面
});
let spheremesh = new THREE.Mesh(geometry2, material2);
sphereGroup.add(spheremesh);
sphereGroup.rotateZ(Math.PI / 2);
scene.add(sphereGroup);

// 隧道圆柱面上设置一些装饰圆点
let sphereGeo = new THREE.CylinderGeometry(R, R, R * 8, 32, 50, true);
let pos = sphereGeo.attributes.position;
let cirGeo = new THREE.CircleGeometry(8, 15, 15);
for (let i = 0; i < pos.count; i++) {
    let cirMaterial = new THREE.MeshLambertMaterial({
        color: 0xaaaa66,
        side: THREE.BackSide,
    }); //材质对象Material
    cirMaterial.color.r = Math.random() * 0.7 + 0.3;
    cirMaterial.color.g = cirMaterial.color.r;
    cirMaterial.color.b = cirMaterial.color.r;
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);
    let V1 = new THREE.Vector3(0, 0, 1); //垂直屏幕的方向  z轴方向
    let V2 = new THREE.Vector3(x, 0, z).normalize(); //圆柱y设置为0
    let q = new THREE.Quaternion();
    q.setFromUnitVectors(V1, V2);
    let M = new THREE.Matrix4();
    M.makeRotationFromQuaternion(q);
    let planeMesh = new THREE.Mesh(cirGeo, cirMaterial); //网格模型对象Mesh
    planeMesh.applyMatrix4(M);
    planeMesh.position.set(x, y, z);
    sphereGroup.add(planeMesh);
}
sphereGroup.position.y = -10;
scene.fog = new THREE.Fog(0xcccccc, 1200, 3500);
export { scene, directionalLight, directionalLight2, ambient };
