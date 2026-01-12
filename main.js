let scene, camera, renderer, controls;
let moveForward = false, moveBackward = false;
let moveLeft = false, moveRight = false;
let velocity = new THREE.Vector3();

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.PointerLockControls(camera, document.body);

  document.body.addEventListener("click", () => {
    controls.lock();
  });

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

  // Test objesi
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
  );
  box.position.set(0, 1, -5);
  scene.add(box);

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
}

function onKeyDown(event) {
  if (event.code === "KeyW") moveForward = true;
  if (event.code === "KeyS") moveBackward = true;
  if (event.code === "KeyA") moveLeft = true;
  if (event.code === "KeyD") moveRight = true;
}

function onKeyUp(event) {
  if (event.code === "KeyW") moveForward = false;
  if (event.code === "KeyS") moveBackward = false;
  if (event.code === "KeyA") moveLeft = false;
  if (event.code === "KeyD") moveRight = false;
}

function animate() {
  requestAnimationFrame(animate);

  velocity.set(0, 0, 0);

  if (moveForward) velocity.z -= 0.1;
  if (moveBackward) velocity.z += 0.1;
  if (moveLeft) velocity.x -= 0.1;
  if (moveRight) velocity.x += 0.1;

  controls.moveRight(velocity.x);
  controls.moveForward(velocity.z);

  renderer.render(scene, camera);
}
