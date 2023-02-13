<template>
    <div class="container" id="container">
        <div id="color" class="color">
            <div class="colorChoose" id="color1" @click="handleColorClick(0x023911)">
                <img src="model/绿.jpg" />
            </div>
            <div class="colorChoose" id="color2" @click="handleColorClick(0x222222)">
                <img src="model/灰.jpg" />
            </div>
            <div class="colorChoose" id="color3" @click="handleColorClick(0x6a030a)">
                <img src="model/红.jpg" />
            </div>
            <div class="colorChoose" id="color4" @click="handleColorClick(0x000000)">
                <img src="model/黑.jpg" />
            </div>
            <div class="colorChoose" id="color5" @click="handleColorClick(0xffffff)">
                <img src="model/白.jpg" />
            </div>
        </div>
        <div id="changeColor" class="changeColor" @click="handleChangeColor">
            <img src="model/变色.png" alt="" width="24" style="vertical-align: middle" />
            <span id="changeColorText">停止变色</span>
        </div>
        <div id="rotateAudio" class="rotateAudio">
            <div id="rotate" @click="handleRotateClick">
                <img
                    id="rotateimg"
                    src="model/旋转.png"
                    alt=""
                    width="24"
                    style="vertical-align: middle"
                />
            </div>
            <!-- <div id="audio" style="margin-top: 20px;">
      <img id="audioimg" src="./assets/关闭声音.png" alt="" width="24" style="vertical-align: middle;">
    </div> -->
            <div style="margin-top: 20px" @click="handleSwitchLight">
                <img
                    id="light"
                    src="model/开车灯.png"
                    alt=""
                    width="24"
                    style="vertical-align: middle"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { renderer } from './scene/RenderLoop';
import { colorTween } from './scene/colorTween';
import { model } from './scene/model.js'; // 车模型
import { scene } from './scene/scene.js';
import { openCarLight, closeCarLight } from './scene/openCarLight';
export default {
    name: 'Car',
    data() {
        return {
            open: true,
            rotate: true,
            light: false,
            rotateAnimation: null,
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            const container = document.getElementById('container');
            container.appendChild(renderer.domElement);
            this.loop();
        },
        handleColorClick(value) {
            this.setColor(value);
        },
        handleChangeColor() {
            if (this.open) {
                colorTween.stop(); //停止动画
                this.open = false;
                document.getElementById('changeColorText').innerHTML = '开始变色';
                this.setColor(0x023911); //动画停止，颜色回到最初的状态
            } else {
                colorTween.start(); //开始动画
                this.open = true;
                document.getElementById('changeColorText').innerHTML = '停止变色';
            }
        },
        setColor(color) {
            model.traverse(function (object) {
                if (object.type === 'Mesh') {
                    if (object.name.slice(0, 2) == '外壳') {
                        //外壳颜色设置
                        object.material.color.set(color);
                    }
                }
            });
        },
        loop() {
            this.rotateAnimation = requestAnimationFrame(this.loop);
            scene.rotateY(0.002);
        },
        handleRotateClick() {
            if (this.rotate) {
                cancelAnimationFrame(this.rotateAnimation);
                this.rotate = false;
                document.getElementById('rotateimg').src = 'model/停止旋转.png';
            } else {
                this.loop();
                this.rotate = true;
                document.getElementById('rotateimg').src = 'model/旋转.png';
            }
        },
        handleSwitchLight() {
            if (this.light) {
                closeCarLight();
                this.light = false;
                document.getElementById('light').src = 'model/开车灯.png';
            } else {
                openCarLight();
                this.light = true;
                document.getElementById('light').src = 'model/关车灯.png';
            }
        },
    },
};
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
}
.color {
    width: 380px;
    position: absolute;
    background: rgba(0, 0, 0, 0.2);
    padding: 10px 16px;
    border-radius: 6px;
    left: 50%;
    margin-left: -190px;
    top: 100%;
    margin-top: -80px;
}
.colorChoose {
    display: inline-block;
    margin-left: 20px;
    cursor: pointer;
}

.colorChoose img {
    width: 50px;
    border-radius: 25px;
}
.changeColor {
    color: #ffffff;
    font-size: 16px;
    display: block;
    padding: 8px 16px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 30px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: 50%;
    margin-top: -22px;
}
.rotateAudio {
    position: absolute;
    left: 10px;
    top: 50%;
    margin-top: -55px;
}

.rotateAudio div {
    padding: 10px 10px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 22px;
    cursor: pointer;
}
</style>
