// methods to be set on and bound to a threeJS component

const measureWindow = function() {
  this.windowWidth      = window.innerWidth;
  this.windowHeight     = window.innerHeight;
  this.windowHalfWidth  = window.innerWidth / 2;
  this.windowHalfHeight = window.innerHeight / 2;
};

const setupCamera = function(fov, near, far, position) {
  this.camera = new THREE.PerspectiveCamera(
    fov, this.windowWidth / this.windowHeight,
    near, far
  );
  this.camera.position.x = position.x;
  this.camera.position.y = position.y;
  this.camera.position.z = position.z;
};

const setupRenderer = function({ divID }) {
  this.renderer = new THREE.CanvasRenderer();
  this.renderer.setPixelRatio(window.devicePixelRatio);
  this.renderer.setSize(this.windowWidth, this.windowHeight);

  document.getElementById(divID)
    .appendChild(this.renderer.domElement);
};

const animate = function(time) {
  /// TWEEN.update and this.controls.update are remnants
  /// of Nate's camera animation experiments
  TWEEN.update(time);
  this.controls.update();
  requestAnimationFrame(this.animate);
  this.renderNextFrame();
};

const setupMouse = function() {
  [this.mouseX, this.mouseY] = [0, 0];
}

const setupControls = function() {
  this.controls = new THREE.OrbitControls(
    this.camera,
    this.renderer.domElement,
  );
  this.controls.target = new THREE.Vector3(0, 10, 0);
}

export default {
  animate,
  measureWindow,
  setupCamera,
  setupRenderer,
  setupMouse,
  setupControls
}
