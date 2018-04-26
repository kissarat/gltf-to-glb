var camera, scene, renderer;
var meshes = [];

init();
animate();

function init() {
	var appElement = document.getElementById('app');

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setClearColor(0x000000, 1);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
	camera.position.z = 1000;

	scene = new THREE.Scene();

	window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
