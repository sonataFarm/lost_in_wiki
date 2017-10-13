import React from 'react';
import threeUtil from '../util/three-util';

const NUM_STARS = 500;
const FONT_SIZE = 18;

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
		window.addEventListener('resize', this.onWindowResize, false);
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
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 1000;
    return camera;
  }

  assignRandomStarCoords = star => {
    star.position.x = Math.random() * 2000 - 1000;
    star.position.y = Math.random() * 2000 - 1000;
    star.position.z = Math.random() * 2000 - 1000;
    star.scale.x = star.scale.y = Math.random() * 20 + 10;

    return star;
  }

  generateStar = material => {
    let star = new THREE.Sprite(material);
    this.assignRandomStarCoords(star);
    return star;
  }

  generateLinkStarLabel = (star, link) => {
    const linkLabel = threeUtil.makeTextSprite(link, FONT_SIZE);

    let scale = linkLabel.position.distanceTo(this.camera.position) / 1;
    scale = Math.min(100, Math.max(100, scale));

    linkLabel.scale.set(scale, scale, scale);
    linkLabel.position.set(star.position.x, star.position.y + 20, star.position.z);

    return linkLabel;
  }

  generateStars = () => {
    const links = this.props.links || [];

    const program = context => {
      context.beginPath();
      context.arc(0, 0, 0.5, 0, Math.PI * 2, false);
      context.fill();
    };

    const linkStarColor = threeUtil.generateRandomColor();
    const linkStarMaterial = new THREE.SpriteCanvasMaterial({
      color: linkStarColor,
      program
    });

    let i;
    for (i = 0; i < this.props.links.length; i++) {
      // generate link stars
      let linkStar = this.generateStar(linkStarMaterial);
      let linkStarLabel = this.generateLinkStarLabel(linkStar, links[i]);

      this.group.add(linkStar);
      this.group.add(linkStarLabel);
      this.geometry.vertices.push(linkStar.position);
    }

    for ( ; i < NUM_STARS; i++) {
      // generate linkless stars
      let starColor = threeUtil.generateRandomColor();
      let starMaterial = new THREE.SpriteCanvasMaterial({
        color: starColor,
        program
      });
      let star = this.generateStar(starMaterial);
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
