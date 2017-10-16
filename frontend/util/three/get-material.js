

const getProgram = state => context => {
  const radius = getRadius(state);
  context.beginPath();
  context.arc(0, 0, radius, 0, Math.PI * 2, false);
  context.fill();
};

const getRadius = state => {
  if (state.isFocus) {return 0.75;}
  else {return 0.5;}
};

const getColor = state => {
  if (!state.isLink) { return 'white'; }
  else if (state.isFocus) { return 'red'; }
  else {return 'blue';}
};


export const getMaterial = state => {
  const program = getProgram(state);
  const color = getColor(state);
  const material = THREE.SpriteCanvasMaterial({
      color,
      program
  });
  return material;
};