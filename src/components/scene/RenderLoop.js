import { scene } from './scene'; //Three.js三维场景
import { renderer, camera } from './RendererCamera'; //渲染器对象和相机对象
// import { guiControls } from './gui.js';
function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    // console.log(guiControls);
    // console.log(camera.position);
}
render();

export { renderer };
