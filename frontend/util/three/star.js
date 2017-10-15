import _ from 'lodash';

const COLOR = 'white';
const PROGRAM = context => {
  context.beginPath();
  context.arc(0, 0, 0.5, 0, Math.PI * 2, false);
  context.fill();
};

const MATERIAL = new THREE.SpriteCanvasMaterial({
    color: new THREE.Color(COLOR),
    program: PROGRAM
});

class Star extends THREE.Sprite {
  constructor(material = MATERIAL) {
    super(material);
  }

  assignRandomCoords = boundaries => {
    const { x, y, z } = boundaries;

    this.position.x = _.random(x.lo, x.hi);
    this.position.y = _.random(y.lo, y.hi);
    this.position.z = _.random(z.lo, z.hi);
    this.scale.x = this.scale.y = Math.random() * 20 + 10;
  }
}

export default Star;
