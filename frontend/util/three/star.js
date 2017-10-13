const STAR_COLOR = 'white';

class Star extends THREE.Sprite {

  static program = context => {
    context.beginPath();
    context.arc(0, 0, 0.5, 0, Math.PI * 2, false);
    context.fill();
  };

  static material = () => new THREE.SpriteCanvasMaterial({
      color: new THREE.Color(STAR_COLOR),
      program: Star.program
  });

  constructor(material = Star.material()) {
    super(material);
    this.assignRandomStarCoords();
  }

  assignRandomStarCoords = () => {
    this.position.x = Math.random() * 2000 - 1000;
    this.position.y = Math.random() * 2000 - 1000;
    this.position.z = Math.random() * 2000 - 1000;
    this.scale.x = this.scale.y = Math.random() * 20 + 10;
  }
}

export default Star;
