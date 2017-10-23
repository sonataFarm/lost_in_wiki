import React from 'react';
import _ from 'lodash';
import ComponentModule from '../../util/three/three-component-module.js';
import Star from '../../util/three/star/star';

const NUM_STARS = 500;
const STARFIELD_RADIUS = 2000;
const STARFIELD_VOLUME = 4 / 3 * Math.pi * Math.pow(STARFIELD_RADIUS, 3);
// TODO - calculate numstars as percentage of total starfield volume

// coordinate plane boundaries for stars
const X_LO = -Math.floor(STARFIELD_RADIUS);
const X_HI =  Math.floor(STARFIELD_RADIUS);
const Y_LO = -Math.floor(STARFIELD_RADIUS);
const Y_HI =  Math.floor(STARFIELD_RADIUS);
const Z_LO = -Math.floor(STARFIELD_RADIUS);
const Z_HI =  Math.floor(STARFIELD_RADIUS);

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

// % starfield bounds a linkstar may occupy, starting from origin
const LINKSTAR_BOUNDARY_RATIO = 0.5;

// coordinate plane boundaries for linkstars
const LINKSTAR_BOUNDARIES = _.mapValues(STAR_BOUNDARIES, coord => (
  _.mapValues(coord, bound => (
    Math.floor(bound * LINKSTAR_BOUNDARY_RATIO)
  ))
));

// camera
const CAMERA_FOV = 50;
const CAMERA_NEAR = 25;
const CAMERA_FAR = 10000;
const CAMERA_INITIAL_Z = 1000;

// styling
const LINE_COLOR = 'white';
const LINE_OPACITY = 0.25;

// !!! testing
const TEST_STAR_VECTOR = new THREE.Vector3(1000, 1000, 0);
// !!! end

class Starfield extends React.Component {
  constructor(props) {
    super(props);

    this.measureWindow = ComponentModule.measureWindow.bind(this);
    this.setupMouse    = ComponentModule.setupMouse.bind(this);
    this.setupCamera   = ComponentModule.setupCamera.bind(this);
    this.setupRenderer = ComponentModule.setupRenderer.bind(this);
    this.animate       = ComponentModule.animate.bind(this);
    this.setupControls = ComponentModule.setupControls.bind(this);

    this.state = {
      stars: []
    };
  }

  componentDidMount() {
    this.setup();
    this.generateStars();
    this.setEventListeners();
    this.animate();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.playing && nextProps.playing) {
      this.getUsableLinks(this.props.currentPage);
    } else if (nextProps.currentPage.title !== this.props.currentPage.title) {
      this.handleCurrentPageChange();
    } else if (nextProps.currentPage.usableLinks !== this.props.currentPage.usableLinks) {
      this.generateStars();
      this.setFocusStar(this.state.focusPage);
    } else if (nextProps.game.focusPage !== this.props.game.focusPage) {
      this.handleFocusPageChange(nextprops.game.focusPage);
    }
  }

  handleCurrentPageChange = () => {
    // TODO
  }

  handleFocusPageChange = nextFocusPage => {
    this.state.focusStar.unfocus();
    this.setFocusStar(nextFocusPage);
  }

  setFocusStar = focusPage => {
    const focusStar = this.findStarByTitle(nextFocusPage);
    this.setState({ focusStar });
    focusStar.focus();
  }

  findStarByTitle = title => {
    return this.state.linkStars.find(star => star.title === title);
  }

  setup = () => {
    this.setupMouse();
    this.measureWindow();
    this.setupCamera(
      CAMERA_FOV, CAMERA_NEAR, CAMERA_FAR, CAMERA_INITIAL_Z
    );
    this.setupScene();
    this.setupRenderer({ divID: 'starfield' });
    this.setupControls();
    // !!! bind starfield component on global object for testing
    window.s = this;
    // !!! end
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
        color:   LINE_COLOR,
        opacity: LINE_OPACITY
      })
    );

    this.starfield.add(this.line);
  }

  renderNextFrame = () => {
    // another failed attempt at camera animation,
    // this method is not currently in use
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

  onWindowResize = () => {
    this.windowHalfWidth = window.innerWidth;
    this.windowHalfHeight = window.innerHeight;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );
  };

  onDocumentTouchMove = event => {
    if (event.touches.length === 1) {
      event.preventDefault();
      this.mouseX = event.touches[0].pageX - this.windowHalfWidth;
      this.mouseY = event.touches[0].pageY - this.windowHalfHeight;
    }
  }

  addStar = star => {
    this.starfield.add(star);
    this.geometry.vertices.push(star.position);
  }

  generateStars = () => {
    const regularStarOptions = {
      isLink: false,

    }
    for (let i = this.state.stars.length; i < NUM_STARS; i++) {
      let star = new Star();
      star.assignRandomCoords(STAR_BOUNDARIES);
      this.addStar(star);
      this.geometry.vertices.push(star.position);
    }
    // !!! testing
    this.addTestStar();
    // !!! end
  }

  generateLinkStars() {
    const linkStars = this.props.currentPage.links.map(
      link => new Star({
        isLink: true,
        isFocus: false,
        title: link,
      })
    );

    linkStars.forEach(linkStar => {
      linkStar.assignRandomCoords(LINKSTAR_BOUNDARIES);
      this.addStar(linkStar);

      linkStar.createLabel();
      this.starfield.add(linkStar.title);
    });

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

  // !!! ALL TESTING AND EXPERIMENTAL METHODS BELOW
  addTestStar = () => {
    let star = new Star(new THREE.SpriteCanvasMaterial({
      color: 'red',
      program: Star.program
    }));
    star.position.x = TEST_STAR_VECTOR.x;
    star.position.y = TEST_STAR_VECTOR.y;
    star.position.z = TEST_STAR_VECTOR.z;

    this.addStar(star);
  }

  onKeyDown = event => {
    // (failed) experiment with camera movement via tweening
    // press 'a' to activate
    if (event.key !== 'a') return;
    event.preventDefault();
    //
    // const vector = new THREE.Vector3(
    //   TEST_STAR_VECTOR.x,
    //   TEST_STAR_VECTOR.y,
    //   -1
    // );
    // vector.unproject(this.camera);
    // vector.sub(this.camera.position);

    // const destination = TEST_STAR_VECTOR;
    // const distance = this.camera.position.distanceTo(destination);
    // vector.setLength(distance);

    // this.camera.position = TEST_STAR_VECTOR;
    // this.controls.target = TEST_STAR_VECTOR;

    // const rotation_matrix = new THREE.Matrix4();
    // rotation_matrix.lookAt(this.camera, destination, this.camera.up);
    //
    // const target_rotation = new THREE.Euler(0, 0, 0, "XYZ");
    // target_rotation.setFromRotationMatrix(rotation_matrix);

    //
    // var startRotation = new THREE.Euler().copy(camera.rotation);
    //
    // // final rotation (with lookAt)
    // camera.lookAt( object.position );
    // var endRotation = new THREE.Euler().copy( camera.rotation );
    //
    // // revert to original rotation
    // camera.rotation.copy( startRotation );
    //
    // // Tween
    // new TWEEN.Tween( camera ).to( { rotation: endRotation }, 600 ).start();

    const tweenCamera = new TWEEN.Tween(this.camera.position)
      .to(TEST_STAR_VECTOR)
      .easing(TWEEN.Easing.Linear.None)
      .start();

    const tweenControls = new TWEEN.Tween(this.controls.target)
      .to(TEST_STAR_VECTOR)
      .easing(TWEEN.Easing.Linear.None)
      .start();
  }


    onDocumentMouseDown = (event) => {
      // attempt to integrate tweening into marlene's camera movement
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

        const newCameraPosition = cameraPosition.addVectors(this.camera.position, vector.setLength(zoomPos));
        const tweenCamera = new TWEEN.Tween(this.camera.position)
          .to(newCameraPosition)
          .easing(TWEEN.Easing.Linear.None)
          .start();

        const controlsTargetVector = new THREE.Vector3(controls.target);
        const newControlsTarget = controlsTargetVector.addVectors(controls.target, vector.setLength(zoomPos));

        const tweenControls = new TWEEN.Tween(this.controls.target)
          .to(newControlsTarget)
          .easing(TWEEN.Easing.Linear.None)
          .start();


        var rotation_matrix = new THREE.Matrix4();
        rotation_matrix.lookAt(this.camera, intersects[0].object.position, this.camera.up);
        var target_rotation = new THREE.Euler(0,0,0,"XYZ");
        target_rotation.setFromRotationMatrix(rotation_matrix);
      }
    }

    // onDocumentMouseDown = (event) => {
      // marlene initial click movement without tweening
      // (commented out but still available for reference)
    //   // get mouse coords
    //   var mouse = new THREE.Vector2();
    //   mouse.x = (event.clientX / this.windowWidth) * 2 - 1;
    //   mouse.y = -(event.clientY / this.windowHeight) * 2 + 1;
    //
    //   // work out which objects the mouse is over
    //   var raycaster = new THREE.Raycaster();
    //   raycaster.setFromCamera(mouse, this.camera);
    //   debugger;
    //   var intersects = raycaster.intersectObjects( this.starfield.children );
    //   // Change color if particle clicked
    //   if (intersects.length > 0 && intersects[0].object.material.opacity == 1) {
    //     intersects[0].object.material.color.set( 0xff0000 );
    //
    //     // interesting stuff starts here...
    //     const controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    //     var vector = new THREE.Vector3(mouse.x, mouse.y, -1 );
    //     vector.unproject(this.camera);
    //     vector.sub(this.camera.position);
    //     debugger;
    //
    //     var cameraPosition = new THREE.Vector3(this.camera.position.x, this.camera.position.y, this.camera.position.z);
    //     var intersectPosition = new THREE.Vector3(intersects[0].object.position.x, intersects[0].object.position.y , intersects[0].object.position.z );
    //
    //     var zoomPos = intersectPosition.distanceTo( cameraPosition );
    //     this.camera.position.addVectors(this.camera.position, vector.setLength(zoomPos));
    //     controls.target.addVectors(controls.target, vector.setLength(zoomPos));
    //
    //     var rotation_matrix = new THREE.Matrix4();
    //     rotation_matrix.lookAt(this.camera, intersects[0].object.position, this.camera.up);
    //     var target_rotation = new THREE.Euler(0,0,0,"XYZ");
    //     target_rotation.setFromRotationMatrix(rotation_matrix);
    //   }
    // }
  // !!! end
}

export default Starfield;

// TODO: remove event listeners when component unmounts (does component ever unmount?)
