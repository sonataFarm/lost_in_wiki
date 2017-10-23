//Stores the color and radius properties of stars, and the logic for
//assigning these based on star state
//store style properties here instead of hard coding them elsewhere

export const NOLINK = {radius: 0.5, color: 'white'};
export const LINK_NOFOCUS = {radius: 0.5, color: 'blue'};
export const LINK_FOCUS = {radius: 0.75, color: 'red'};


//font-sizes for link-stars.
export const LABEL_FONT_SIZE = 18;
export const LABEL_X_OFFSET  = 50;
export const LABEL_Y_OFFSET  = 0;


export const generateMaterialStyle = state => {
  if (!state.isLink) return NOLINK;
  else if (state.isFocus) return LINK_FOCUS;
  else return LINK_NOFOCUS;
};
