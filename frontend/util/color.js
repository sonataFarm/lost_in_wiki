import _ from 'lodash';

class Color {

  static random() {
    const red   = _.random(0, 255);
    const green = _.random(0, 255);
    const blue  = _.random(0, 255);

    return new Color(red, green, blue);
  }

  static randomRGBValue() {
    return _.random(0, 255);
  }

  static fromString(colorString) {
    const rgb = colorString.slice(4).slice(0, -1)
    .split(', ').map(num => parseInt(num));

    return new Color(...rgb);
  }

  static randomHue() {
    const hues = ['red', 'green', 'blue'];
    const randIdx = _.random(0, hues.length - 1);

    return hues[randIdx];
  }

  constructor(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  toString() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`
  }
}

export default Color;
