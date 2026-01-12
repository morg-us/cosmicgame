import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";
import { PointerLockControls } from "https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/controls/PointerLockControls.js";

console.log("THREE YÜKLENDİ", THREE);

let scene, camera, renderer, controls;
let gameStarted = false;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

initMenu();

function initMenu() {
  document.getElementById("startBtn").addEventListener("click", startGame);
}

function startGame() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("crosshair").style.display = "block";

  initGame();
  animate();

  document.body.addEventListener("click", () => {
    controls.lock();
  });
}

function initGame() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = "fixed";
  renderer.domElement.style.top = "0";
  renderer.domElement.style.left = "0";
  renderer.domElement.style.zIndex = "1";
  document.body.appendChild(renderer.domElement);

  controls = new PointerLockControls(camera, document.body);
  scene.add(controls.getObject());

  // Işık
  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  scene.add(light);

  // Zemin
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshStandardMaterial({ color: 0x333333 })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // Test küp
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
  );
  box.position.set(0, 1, -5);
  scene.add(box);

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  gameStarted = true;
}

function onKeyDown(e) {
  if (!gameStarted) return;
  if (e.code === "KeyW") moveForward = true;
  if (e.code === "KeyS") moveBackward = true;
  if (e.code === "KeyA") moveLeft = true;
  if (e.code === "KeyD") moveRight = true;
}

function onKeyUp(e) {
  if (e.code === "KeyW") moveForward = false;
  if (e.code === "KeyS") moveBackward = false;
  if (e.code === "KeyA") moveLeft = false;
  if (e.code === "KeyD") moveRight = false;
}

function animate() {
  if (!gameStarted) return;
  requestAnimationFrame(animate);

  if (moveForward) controls.moveForward(0.1);
  if (moveBackward) controls.moveForward(-0.1);
  if (moveLeft) controls.moveRight(-0.1);
  if (moveRight) controls.moveRight(0.1);

  renderer.render(scene, camera);
}
