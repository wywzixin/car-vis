// 引入Three.js
import * as THREE from 'three';
// 引入gltf模型加载库GLTFLoader.js

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { SetCarMaterial } from './SetCarMaterial';
import { CreateCarTags } from './PointsTag'; //创建热点
import { open } from './open.js';
import { lensflare1, lensflare2 } from './openCarLight'; //轿车前灯发光模拟
let model = new THREE.Group();
let loader = new GLTFLoader();

loader.load('model/轿车.glb', function (gltf) {
    SetCarMaterial(gltf.scene);

    model.add(gltf.scene);
    CreateCarTags(gltf.scene);
    open(gltf.scene); //车门打开

    let light1 = gltf.scene.getObjectByName('镜头光晕1');
    let light2 = gltf.scene.getObjectByName('镜头光晕2');
    light1.add(lensflare1);
    light2.add(lensflare2);
});
export { model };
