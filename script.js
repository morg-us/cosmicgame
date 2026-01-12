let scene, camera, renderer, thomas, jack;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020202);
    
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Işıklandırma
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);

    // Zemin
    const grid = new THREE.GridHelper(100, 50, 0x00ffcc, 0x050505);
    grid.position.y = -5;
    scene.add(grid);

    // Karakter Yapıcı
    function makeChar(color, x) {
        const group = new THREE.Group();
        // Vücut
        const body = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.2, 0.7), new THREE.MeshStandardMaterial({color: color}));
        body.position.y = 1.1;
        group.add(body);
        // Kafa
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 16), new THREE.MeshStandardMaterial({color: 0xffdbac}));
        head.position.y = 2.6;
        group.add(head);
        
        group.position.set(x, -5, 5);
        scene.add(group);
        return group;
    }

    // Pozisyonlar (Kartların tam üstüne gelecek şekilde ayarlandı)
    thomas = makeChar(0xeeeeee, -11); 
    jack = makeChar(0x333333, -4);

    camera.position.set(0, 0, 18);
}

function animate() {
    requestAnimationFrame(animate);
    const t = Date.now() * 0.002;
    if(thomas) thomas.position.y = -5 + Math.sin(t) * 0.1;
    if(jack) jack.position.y = -5 + Math.cos(t) * 0.1;
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
animate();
