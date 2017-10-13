import React from 'react';
import threeUtil from '../util/three/three-util';
import Star from '../util/three/star';
import LinkStar from '../util/three/link-star';

const NUM_STARS = 500;

class StarField extends React.Component {
  constructor(props) {
    super(props);

    [this.mouseX, this.mouseY] = [0, 0];
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.camera = this.initializeCamera();
    this.scene = new THREE.Scene();

    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.geometry = new THREE.Geometry();

    this.generateStars(this.props.links);

    this.line = new THREE.Line(
      this.geometry,
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        opacity: 0.25
      })
    );

    this.group.add(this.line);

    this.renderer = new THREE.CanvasRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  componentDidMount() {
    document.getElementById('starfield').appendChild(this.renderer.domElement);
    this.setEventListeners();
    this.animate();
  }

  componentWillReceiveProps(nextProps) {
    generateStars(nextProps.links);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderNextFrame();
  }

  renderNextFrame = () => {
    this.camera.position.x += (this.mouseX - this.camera.position.x) * 1;
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * 1;
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
  }

  setEventListeners = () => {
    document.addEventListener('mousemove', this.onDocumentMouseMove, false);
    document.addEventListener('touchstart', this.onDocumentTouchStart, false);
    document.addEventListener('touchmove', this.onDocumentTouchMove, false);
    document.addEventListener('mousedown', this.onDocumentMouseDown, true);
    document.addEventListener('keydown', this.onKeyDown.bind(this));
		window.addEventListener('resize', this.onWindowResize, false);
  }

  onKeyDown = event => {
    if (event.key === 'ArrowUp') {
      this.camera.position.z -= 50;
    } else if (event.key === 'ArrowDown') {
      this.camera.position.z += 50;
    }

    console.log(event.key);
    console.log(this.camera.position)
  }

  onDocumentMouseMove = event => {
    this.mouseX = event.clientX - this.windowHalfX / 2;
    this.mouseY = event.clientY - this.windowHalfY / 2;
  }

  onDocumentTouchStart = event => {
    if (event.touches.length === 1) {
      event.preventDefault();
      this.mouseX = event.touches[0].pageX - this.windowHalfX;
      this.mouseY = event.touches[0].pageY - this.windowHalfY;
    }
  }

  onDocumentTouchMove = event => {
    if (event.touches.length === 1) {
      event.preventDefault();
      this.mouseX = event.touches[0].pageX - this.windowHalfX;
      this.mouseY = event.touches[0].pageY - this.windowHalfY;
    }
  }

  onDocumentMouseDown = event => {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    const intersects = raycaster.intersectObjects(this.group.children);
    // Change color if particle clicked
    if (intersects.length > 0 && intersects[0].object.material.opacity == 1) {
        intersects[0].object.material.color.set(0xff0000);
    }
  }

  onWindowResize = () => {
    this.windowHalfX = window.innerWidth;
    this.windowHalfY = window.innerHeight;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );
  };

  initializeCamera = () => {
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;
    return camera;
  }

  generateStars = () => {
    const links = this.props.links || [];

    let i;
    for (i = 0; i < this.props.links.length; i++) {
      let linkStar = new LinkStar(links[i], this.camera);

      this.group.add(linkStar);
      this.group.add(linkStar.label);
      this.geometry.vertices.push(linkStar.position);
    }

    for (let i = 0; i < NUM_STARS; i++) {
      let star = new Star();
      this.group.add(star);
      this.geometry.vertices.push(star.position);
    }
  }

  render() {
    return (
      <div id="starfield">
      </div>
    );
  }
}

export default StarField;
