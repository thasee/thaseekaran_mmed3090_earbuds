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



// Canvas Explode View Animation
const canvas = document.querySelector("#explode-view");
const context = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

const frameCount = 91;
const images = [];
let imagesLoaded = 0;

// Preload images
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = `images/frame_${i.toString().padStart(3, '0')}.webp`;

    img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === frameCount) {
            initAnimation();
        }
    };

    img.onerror = () => {
        console.error(`Failed to load image: ${img.src}`);
    };

    images.push(img);
}

const buds = { frame: 0 };

function initAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(buds, {
        frame: frameCount - 1,
        snap: "frame",
        scrollTrigger: {
            trigger: "#explode-view",
            pin: true,
            scrub: 1,
            markers: true,
            start: "top top",
        },
        onUpdate: render,
    });

    render();
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const currentImage = images[Math.round(buds.frame)];
    if (currentImage) {
        context.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
    }
}





function loadInfo() {
    infoBoxes.forEach((infoBox, index) => {
        const selected = document.querySelector(`.Hotspot[slot="hotspot-${index + 1}"]`);
        if (selected) {
            const imageBox = document.createElement("img");
            imageBox.src = infoBox.image;
            imageBox.classList.add("hotspot-image");

            const titleBox = document.createElement("h3");
            titleBox.textContent = infoBox.title;
            titleBox.classList.add("hotspot-title");

            const textBox = document.createElement("p");
            textBox.textContent = infoBox.text;
            textBox.classList.add("hotspot-text");

            const annotationDiv = selected.querySelector(".HotspotAnnotation");
            annotationDiv.innerHTML = "";
            annotationDiv.append(titleBox, imageBox, textBox);
        }
    });
}

loadInfo();

function showInfo() {
    const annotation = this.querySelector(".HotspotAnnotation");
    if (annotation) gsap.to(annotation, { autoAlpha: 1, duration: 0.5 });
}

function hideInfo() {
    const annotation = this.querySelector(".HotspotAnnotation");
    if (annotation) gsap.to(annotation, { autoAlpha: 0, duration: 0.5 });
}

hotspots.forEach((hotspot) => {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
});




