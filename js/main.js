import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js"
        // Scene
        const scene = new THREE.Scene();
//scene.background = new THREE.Color(0xff0000);
scene.background = null;
// Camera
const camera = new THREE.PerspectiveCamera(395, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.set(19, 2, 1000);

// Renderer
const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);
//document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.02;
//controls.maxDistance = 1000; // Adjust this value to control the rotation radius
controls.minDistance = 30; // Optional: Set a minimum distance
// Light
const light = new THREE.AmbientLight(0xffffff, 7);
scene.add(light);

const topLight = new THREE.DirectionalLight(0xffffff, 15);
topLight.position.set(500, 500, 500);
scene.add(topLight);

// Load Model
const loader = new GLTFLoader();

loader.load(
    '/images/model/build.gltf',
    function(gltf) {
        scene.add(gltf.scene);
        
        // Center camera on model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        camera.position.z = 15;
        camera.lookAt(center);
    },
    undefined,
    function(error) {
        console.error('Error loading model:', error);
    }
);

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();