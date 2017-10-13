import * as THREE from three;

const makeTextSprite = ( message, fontsize ) => {
  var ctx, texture, sprite, spriteMaterial, canvas = document.createElement('canvas');
      ctx = canvas.getContext('2d');
      ctx.font = fontsize + "px Open Sans";

      // setting canvas width/height before ctx draw, else canvas is empty
      canvas.width = ctx.measureText(message).width;
      canvas.height = fontsize * 2; // fontsize * 1.5

      // after setting the canvas width/height we have to re-set font to apply!?! looks like ctx reset
      ctx.font = fontsize + "px Open Sans";

      ctx.fillStyle = "rgba(255,255,255,255)";
      ctx.fillText(message, 0, fontsize);

      texture = new THREE.Texture(canvas);
      texture.minFilter = THREE.LinearFilter; // NearestFilter;
      texture.needsUpdate = true;

      spriteMaterial = new THREE.SpriteMaterial({map : texture});
      sprite = new THREE.Sprite(spriteMaterial);
      return sprite;
};

const generateRandomColor = () => (
  new THREE.Color(Math.random(), Math.random(), Math.random())
);

export default {
  makeTextSprite,
  generateRandomColor,
  eventListeners
}
