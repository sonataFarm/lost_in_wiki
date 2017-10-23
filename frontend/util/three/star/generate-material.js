//This code handles the material properties of the stars
//Don't edit this code to change existing style properties, instead use
//star_styling.js

import { generateMaterialStyle } from './star-style';


const generateProgram = style => context => {
  context.beginPath();
  context.arc(0, 0, style.radius, 0, Math.PI * 2, false);
  context.fill();
};

const generateMaterial = state => {
  Object.freeze(state);
  const style = generateMaterialStyle(state);
  const color = style.color;
  const program = generateProgram(style);

  return new THREE.SpriteCanvasMaterial({
      color,
      program
  });
};

export default generateMaterial;
