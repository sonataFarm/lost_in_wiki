//This code handles the material properties of the stars
//Don't edit this code to change existing style properties, instead use
//star_styling.js

import {getMaterialStyle} from './star-styles';


const getProgram = style => context => {
  context.beginPath();
  context.arc(0, 0, style.radius, 0, Math.PI * 2, false);
  context.fill();
};

const getMaterial = state => {
  Object.freeze(state);
  const style = getMaterialStyle(state);
  const color = style.color;
  const program = getProgram(style);
  const material = THREE.SpriteCanvasMaterial({
      color,
      program
  });
  return material;
};

export default getMaterial;
