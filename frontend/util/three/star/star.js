import _ from 'lodash';

import getMaterial from './get-material';

import {
  LABEL_FONT_SIZE,
  LABEL_X_OFFSET,
  LABEL_Y_OFFSET
} from './star-style.js';

//Handles the rendering logic for stars
//Note that color and radius properties are handled by getMaterial
//To add or edit cases for these properties use star-style.js

class Star extends THREE.Sprite {
  constructor(options) {
    this.state = {
      isLink: options.isLink,
      isFocus: options.isFocus
    };
    this.material = getMaterial(this.state);
    super(this.material);
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

    let scale = label.position.distanceTo(this.camera.position);
    scale = Math.min(100, Math.max(100, scale));

    label.scale.set(scale, scale, scale);
    label.position.set(
      this.position.x + LABEL_X_OFFSET,
      this.position.y + LABEL_Y_OFFSET,
      this.position.z
    );

    this.label = label;
  }

  makeLink() {
    this.state.isLink = true;
    this.refreshMaterial.bind(this)();
  }

  unmakeLink() {
    this.state.isLink = false;
    this.refreshMaterial.bind(this)();
  }

  focus() {
    this.state.isFocus = true;
    this.refreshMaterial.bind(this)();
  }

  unfocus() {
    this.state.isFocus = false;
    this.refreshMaterial.bind(this)();
  }

  refreshMaterial() {
    this.material = getMaterial(this.state);
  }
}

export default Star;
