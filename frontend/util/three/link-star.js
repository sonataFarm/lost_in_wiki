import ThreeUtil from './three-util';
import Star from './star';

const LINK_STAR_COLOR = 'blue';
const LABEL_FONT_SIZE = 18;
const LABEL_X_OFFSET = 50;
const LABEL_Y_OFFSET = 0;


class LinkStar extends Star {
  static material = () => new THREE.SpriteCanvasMaterial({
      color: new THREE.Color(LINK_STAR_COLOR),
      program: Star.program
  });

  constructor(title, camera, material = LinkStar.material()) {
    super(material);
    this.camera = camera;
    this.title = title;
  }

  get label() {
    const label = ThreeUtil.makeTextSprite(this.title, LABEL_FONT_SIZE);

    let scale = label.position.distanceTo(this.camera.position) / 1;
    scale = Math.min(100, Math.max(100, scale));

    label.scale.set(scale, scale, scale);
    label.position.set(
      this.position.x + LABEL_X_OFFSET,
      this.position.y + LABEL_Y_OFFSET,
      this.position.z
    );

    return label;
  }
}

export default LinkStar;
