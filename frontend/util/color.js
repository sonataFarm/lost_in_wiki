import _ from 'lodash';

const MAX_HUE_VALUE = 255;
const MIN_CONTRAST = 3.5;

class Color {
  // color is { red, green, blue }
  static random() {
    return new Color(
      Color.randomRGBValue(),
      Color.randomRGBValue(),
      Color.randomRGBValue()
    );
  }

  static randomRGBValue() {
    return _.random(MAX_HUE_VALUE);
  }

  static fromString(colorString) {
    const rgb = colorString.slice(4).slice(0, -1)
    .split(', ')
    .map((num) => parseInt(num));

    return new Color(...rgb);
  }

  constructor(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  contrastsWith(otherColor) {
    return Color.contrast(this, otherColor) >= MIN_CONTRAST;
  }

  mask(color2) {
    // return average of self and color2
    let red = (this.red + color2.red) / 2;
    let green = (this.green + color2.green) / 2;
    let blue = (this.blue + color2.blue) / 2;

    return new Color(red, green, blue);
  }

  toCssString() {
    const [red, green, blue] =
    [Math.floor(this.red), Math.floor(this.green), Math.floor(this.blue)];

    return `rgb(${red}, ${green}, ${blue})`
  }

  toString() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  get luminance() {
    let hues = [this.red, this.green, this.blue];

    hues = hues.map(hue => {
      hue /= MAX_HUE_VALUE;
      return hue <= 0.03928 ? hue / 12.92 : Math.pow( (hue + 0.055) / 1.055, 2.4 );
    });

    return hues[0] * 0.2126 + hues[1] * 0.7152 + hues[2] * 0.0722;
  }

  static contrast(color1, color2) {
    return (color1.luminance + 0.05) / (color2.luminance + 0.05);
  }

  get lightness() {
    const red = this.red / 255;
    const green = this.green / 255;
    const blue = this.blue / 255;

    const cmin = Math.min(red, green, blue);
    const cmax = Math.max(red, green, blue);

    return (cmax + cmin) / 2;
  }

  getContrastYIQ() {
  	let yiq = ((this.red * 299) + (this.green * 587) + (this.blue * 114)) / 1000;
  	return (yiq >= 128) ? new Color(0, 0, 0) : new Color(255, 255, 255);
  }
}

export default Color;
