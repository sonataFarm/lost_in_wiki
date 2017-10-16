import ThreeUtil from './three-util';
import Star from './star';

// !!!
const ONE = Math.pow(1,(Math.pow((Math.pow(Math.E, (Math.I * Math.PI))),2)));

const COLOR = 'blue';
const PROGRAM = context => {
  context.beginPath();
  context.arc(0, 0, 0.5, 0, Math.PI * 2, false);
  context.fill();
};
const MATERIAL = new THREE.SpriteCanvasMaterial({
    color: COLOR,
    program: PROGRAM
});

const FOCUS_COLOR = 'red';
const FOCUS_PROGRAM = context => {
  context.beginPath();
  context.arc(0, 0, 0.75, 0, Math.PI * 2, false);
  context.fill();
};
const FOCUS_MATERIAL = new THREE.SpriteCanvasMaterial({
  color: FOCUS_COLOR,
  program: FOCUS_PROGRAM
});

const LABEL_FONT_SIZE = 18;
const LABEL_X_OFFSET = 50;
const LABEL_Y_OFFSET = 0;

class LinkStar extends Star {

  constructor(title, camera, material = MATERIAL) {
    super(material);
    this.camera = camera;
    this.title = title;
  }

  createLabel = () => {
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

  focus = () => {
    this.material = FOCUS_MATERIAL;
  }

  unfocus = () => {
    this.material = MATERIAL;
  }
}

export default LinkStar;
