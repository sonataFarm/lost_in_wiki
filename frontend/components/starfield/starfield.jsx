import React from 'react';
import TWEEN from '@tweenjs/tween.js';
import ComponentModule from '../../util/three/three-component-module.js';
import threeUtil from '../../util/three/three-util';
import Star from '../../util/three/star';
import LinkStar from '../../util/three/link-star';

const NUM_STARS = 500;

const STARFIELD_DIAMETER = 4000;

// coordinate plane boundaries for stars
const X_LO = -Math.floor(STARFIELD_DIAMETER / 2);
const X_HI =  Math.floor(STARFIELD_DIAMETER / 2);
const Y_LO = -Math.floor(STARFIELD_DIAMETER / 2);
const Y_HI =  Math.floor(STARFIELD_DIAMETER / 2);
const Z_LO = -Math.floor(STARFIELD_DIAMETER / 2);
const Z_HI =  Math.floor(STARFIELD_DIAMETER / 2);

const STAR_BOUNDARIES = {
  x: {
    lo: X_LO,
    hi: X_HI
  },
  y: {
    lo: Y_LO,
    hi: Y_HI
  },
  z: {
    lo: Z_LO,
    hi: Z_HI
  }
}

// % volume of total starfield a linkstar may occupy, starting from origin
const LINKSTAR_FIELD_VOLUME_RATIO = 0.5;

// coordinate plane boundaries for linkstars
const LINKSTAR_X_LO = Math.floor(X_LO * LINKSTAR_FIELD_VOLUME_RATIO);
const LINKSTAR_X_HI = Math.floor(X_HI * LINKSTAR_FIELD_VOLUME_RATIO);
const LINKSTAR_Y_LO = Math.floor(Y_LO * LINKSTAR_FIELD_VOLUME_RATIO);
const LINKSTAR_Y_HI = Math.floor(Y_HI * LINKSTAR_FIELD_VOLUME_RATIO);
const LINKSTAR_Z_LO = Math.floor(Z_LO * LINKSTAR_FIELD_VOLUME_RATIO);
const LINKSTAR_Z_HI = Math.floor(Z_HI * LINKSTAR_FIELD_VOLUME_RATIO);

const LINKSTAR_BOUNDARIES = {
  x: {
    lo: LINKSTAR_X_LO,
    hi: LINKSTAR_X_HI
  },
  y: {
    lo: LINKSTAR_Y_LO,
    hi: LINKSTAR_Y_HI
  },
  z: {
    lo: LINKSTAR_Z_LO,
    hi: LINKSTAR_Z_HI
  }
};

// Camera
const CAMERA_FOV = 50;
const CAMERA_NEAR = 25;
const CAMERA_FAR = 10000;
const CAMERA_INITIAL_Z = 1000;

class Starfield extends React.Component {
  constructor(props) {
    super(props);

    this.measureWindow = ComponentModule.measureWindow.bind(this);
    this.setupMouse = ComponentModule.setupMouse.bind(this);
    this.setupCamera = ComponentModule.setupCamera.bind(this);
    this.setupRenderer = ComponentModule.setupRenderer.bind(this);
    this.animate = ComponentModule.animate.bind(this);
    this.setupControls = ComponentModule.setupControls.bind(this);
  }

  componentDidMount() {
    this.setup();
    this.generateStars();
    this.setEventListeners();
    this.animate();
  }

  setup = () => {
    this.setupMouse();
    this.measureWindow();
    this.setupCamera(CAMERA_FOV, CAMERA_NEAR, CAMERA_FAR, CAMERA_INITIAL_Z);
    this.setupScene();
    this.setupRenderer({ divID: 'starfield' });
    this.setupControls();
  }

  setupScene = () => {
    this.scene = new THREE.Scene();
    this.starfield = new THREE.Group();
    this.scene.add(this.starfield);
    this.setupGeometry();
}

  setupGeometry = () => {
    this.geometry = new THREE.Geometry();

    this.line = new THREE.Line(
      this.geometry,
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        opacity: 0.25
      })
    );

    this.starfield.add(this.line);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.game.currentPage !== this.props.currentPage) {
      // handle refocus
    } else if (nextProps.game.focusPage !== this.props.focusPage) {
      // handle refocus
    } else if(nextProps.usableLinks !== this.props.usableLinks) {
      // render stars
    }
    generateStars();
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
    event.preventDefault();

    console.log(event.key);
    console.log(this.camera.position)

    const destinationVector = new THREE.Vector3(0, 0, 0);

    const destinationCoords = {
      x: destinationVector.x,
      y: destinationVector.y,
      z: destinationVector.z
    };

    this.controls.target = destinationVector;

    var tween2 = new TWEEN.Tween(this.camera.position)
      .to(destinationCoords)
      .easing(TWEEN.Easing.Linear.None)
      .start();
  }

  onDocumentMouseMove = event => {
    this.mouseX = event.clientX - this.windowHalfWidth / 2;
    this.mouseY = event.clientY - this.windowHalfHeight / 2;
  }

  onDocumentTouchStart = event => {
    if (event.touches.length === 1) {
      event.preventDefault();
      this.mouseX = event.touches[0].pageX - this.windowHalfWidth;
      this.mouseY = event.touches[0].pageY - this.windowHalfHeight;
    }
  }

  onDocumentTouchMove = event => {
    if (event.touches.length === 1) {
      event.preventDefault();
      this.mouseX = event.touches[0].pageX - this.windowHalfWidth;
      this.mouseY = event.touches[0].pageY - this.windowHalfHeight;
    }
  }
  //
  // onDocumentMouseDown = event => {
  //   const mouse = new THREE.Vector2();
  //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  //
  //   const raycaster = new THREE.Raycaster();
  //   raycaster.setFromCamera(mouse, this.camera);
  //
  //   const intersects = raycaster.intersectObjects(this.starfield.children);
  //   // Change color if particle clicked
  //   if (intersects.length > 0 && intersects[0].object.material.opacity == 1) {
  //       intersects[0].object.material.color.set(0xff0000);
  //
  //   }
  // }


  onDocumentMouseDown = (event) => {
    // get mouse coords
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / this.windowWidth) * 2 - 1;
    mouse.y = -(event.clientY / this.windowHeight) * 2 + 1;

    // work out which objects the mouse is over
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    var intersects = raycaster.intersectObjects( this.starfield.children );
    // Change color if particle clicked
    if (intersects.length > 0 && intersects[0].object.material.opacity == 1) {
      intersects[0].object.material.color.set( 0xff0000 );

      // interesting stuff starts here...
      const controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );


      var vector = new THREE.Vector3(mouse.x, mouse.y, -1 );
      vector.unproject(this.camera);
      vector.sub(this.camera.position);

      var cameraPosition = new THREE.Vector3(this.camera.position.x, this.camera.position.y, this.camera.position.z);
      var intersectPosition = new THREE.Vector3(intersects[0].object.position.x, intersects[0].object.position.y , intersects[0].object.position.z );

      var zoomPos = intersectPosition.distanceTo( cameraPosition );
      this.camera.position.addVectors(this.camera.position, vector.setLength(zoomPos));
      controls.target.addVectors(controls.target, vector.setLength(zoomPos));

      var rotation_matrix = new THREE.Matrix4();
      rotation_matrix.lookAt(this.camera, intersects[0].object.position, this.camera.up);
      var target_rotation = new THREE.Euler(0,0,0,"XYZ");
      target_rotation.setFromRotationMatrix(rotation_matrix);
    }
  }

  onWindowResize = () => {
    this.windowHalfWidth = window.innerWidth;
    this.windowHalfHeight = window.innerHeight;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );
  };

  initializeCamera = () => {
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;
    return camera;
  }

  addStar = star => {
    this.starfield.add(star);
    this.geometry.vertices.push(star.position);
  }

  generateStars = () => {
    const linkStars = this.props.links.map(
      link => new LinkStar(link, this.camera)
    );

    linkStars.forEach(linkStar => {
      linkStar.assignRandomCoords(LINKSTAR_BOUNDARIES)
      this.addStar(linkStar);
      this.starfield.add(linkStar.label);
    });

    for (let i = linkStars.length; i < NUM_STARS; i++) {
      let star = new Star();
      star.assignRandomCoords(STAR_BOUNDARIES);
      this.addStar(star);
      this.geometry.vertices.push(star.position);
    }

    // !!! testing
    this.addOriginStar();
    // !!! end

    this.setState(
      { linkStars }
    );
  }

  render() {
    return (
      <div id="starfield">
      </div>
    );
  }

  // !!! testing
  addOriginStar = () => {
    let star = new Star(new THREE.SpriteCanvasMaterial({
      color: 'red',
      program: Star.program
    }));
    star.position.x = 0;
    star.position.y = 0;
    star.position.z = 0;
    this.addStar(star);
  }
  // !!! end
}

export default Starfield;


/* !!! TODO: removeEventListeners

mapped state props are {
  links,
  currentPage,
  focusedLink
}

- need to do:
  - slow rotate to focused link
  - fast rotate/zoom to selected link
  - coloring

- want to do:
  - hover effect
*/
