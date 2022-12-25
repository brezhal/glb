import * as THREE from '../../libs/three.weapp.js'
import gLTF from '../../jsm/loaders/GLTFLoader'
import {
    OrbitControls
} from '../../jsm/controls/OrbitControls'
let window = THREE.global
let GLTFLoader = gLTF(THREE)


Page({
    data: {},
    onLoad: function () {
        var that = this
        wx.createSelectorQuery()
            .select('#c')
            .node()
            .exec((res) => {
                const canvas = new THREE.global.registerCanvas(res[0].node)
                that.render(canvas, THREE)
            })
    },
    onUnload: function () {
        //注意清理global中的canvas对象
        THREE.global.clearCanvas()
    },
    render(canvas) {
        const renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        // renderer.setSize(canvas.width, canvas.height);
        renderer.gammaOutput = true;

        const fov = 45;
        const aspect = 2; // the canvas default
        const near = 0.1;
        const far = 100;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 5, 18);

        const controls = new OrbitControls(camera, canvas);
        controls.target.set(0, 5, 0);
        controls.update();
 
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xbbbbbb);

        loadFont()
        {
            const skyColor = 0xB1E1FF; // light blue
            const groundColor = 0xB97A20; // brownish orange
            const intensity = 1;
            const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
            scene.add(light);
        }

        {
            const color = 0xFFFFFF;
            const intensity = 1;
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(5, 10, 2);
            scene.add(light);
            scene.add(light.target);
        }



        {
            const gltfLoader = new GLTFLoader();
            gltfLoader.load('https://ymkd-test.oss-cn-shanghai.aliyuncs.com/asset/1525081155665413/scene.glb', (gltf) => {
                const root = gltf.scene;
                scene.add(root);
            });
        }



        function render() {

            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();

            renderer.render(scene, camera);
            canvas.requestAnimationFrame(render);
        }
        function loadFont() {

            const loader = new THREE.FontLoader();
            loader.load('https://ymkd-test.oss-cn-shanghai.aliyuncs.com/workOrder/1527253201318653/PingFang SC Medium_Regular.json', function (response) {
                var material = new THREE.MeshBasicMaterial({
                    color: '#a34852',
                });
                var font = response;
                var geometry = new THREE.TextGeometry('崽崽，', {
                    font: font,
                    size: 80,
                    height: 5,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 10,
                    bevelSize: 2,
                    bevelSegments: 5
                });
                var geometry2 = new THREE.TextGeometry('圣诞节快乐！', {
                    font: font,
                    size: 80,
                    height: 5,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 10,
                    bevelSize: 2,
                    bevelSegments: 5
                });
                var geometry3 = new THREE.TextGeometry('2022.12.25', {
                    font: font,
                    size: 80,
                    height: 5,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 10,
                    bevelSize: 2,
                    bevelSegments: 5
                });
                var mesh = new THREE.Mesh(geometry, material);
                var mesh2 = new THREE.Mesh(geometry2, material);
                var mesh3 = new THREE.Mesh(geometry3, material);
    
                // 1
                mesh.position.x = -0.8;
                mesh.position.y = 5;
                mesh.position.z = 2;
                mesh.rotation.x = 0;
                mesh.rotation.y = Math.PI * 2;
                mesh.scale.set(0.006, 0.006, 0.006);
                // 2
                mesh2.position.x = -1.8;
                mesh2.position.y = 4;
                mesh2.position.z = 2.1;
                mesh2.rotation.x = 0;
                mesh2.rotation.y = Math.PI * 2;
                mesh2.scale.set(0.006, 0.006, 0.006);
                // 3
                mesh3.position.x = -1.8;
                mesh3.position.y = 3;
                mesh3.position.z = 2.2;
                mesh3.rotation.x = 0;
                mesh3.rotation.y = Math.PI * 2;
                mesh3.scale.set(0.006, 0.006, 0.006);
                scene.add(mesh)
                scene.add(mesh2)
                scene.add(mesh3)
            });
    
        }
        canvas.requestAnimationFrame(render);
    },
    touchStart(e) {
        // console.log('canvas', e)
        THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
    },

    touchMove(e) {
        // console.log('canvas', e)
        THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
    },
    touchEnd(e) {
        // console.log('canvas', e)
        THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
    },
    touchCancel(e) {
        // console.log('canvas', e)
    },
    longTap(e) {
        // console.log('canvas', e)
    },
    tap(e) {
        // console.log('canvas', e)
    },
})