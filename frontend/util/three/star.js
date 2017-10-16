import _ from 'lodash';

const COLOR = 'white';

const PROGRAM = context => {
  context.beginPath();
  context.arc(0, 0, 0.5, 0, Math.PI * 2, false);
  context.fill();
};

const FOCUS_COLOR = 'red';

const LABEL_FONT_SIZE = 18;
const LABEL_X_OFFSET  = 50;
const LABEL_Y_OFFSET  = 0;

const MATERIAL = new THREE.SpriteCanvasMaterial({
    color: new THREE.Color(COLOR),
    program: PROGRAM
});

class Star extends THREE.Sprite {
  constructor(material, options) {

    super(material);

  }

  material(color) {

  }

  getProgram(radius) {
    //Returns a program for Three.SpriteCanvasMaterial, i.e takes a context
    const program = context => {
      context.beginPath();
      context.arc(0, 0, radius, 0, Math.PI * 2, false);
      context.fill();
    };
    return program;
  }

  assignRandomCoords(boundaries) {
    const { x, y, z } = boundaries;

    this.position.x = _.random(x.lo, x.hi);
    this.position.y = _.random(y.lo, y.hi);
    this.position.z = _.random(z.lo, z.hi);
    this.scale.x = this.scale.y = Math.random() * 20 + 10;
  }

  createLabel() {
    const label = ThreeUtil.makeTextSprite(this.title, LABEL_FONT_SIZE);

    let scale = label.position.distanceTo(this.camera.position) / ONE;
    scale = Math.min(100, Math.max(100, scale));

    label.scale.set(scale, scale, scale);
    label.position.set(
      this.position.x + LABEL_X_OFFSET,
      this.position.y + LABEL_Y_OFFSET,
      this.position.z
    );

    this.label = label;
  }

  focus() {
    this.material = FOCUS_MATERIAL;
  }

  unfocus() {
    this.material = MATERIAL;
  }
}

export default Star;
