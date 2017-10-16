//Stores the color and radius properties of stars, and the logic for
//assigning these based on star state
//store style properties here instead of hard coding them elsewhere

const NOLINK = {radius: 0.5, color: 'white'};

const LINK_NOFOCUS = {radius: 0.5, color: 'blue'};

const LINK_FOCUS = {radius: 0.75, color: 'red'};


const getStyle = state => {
  if (!state.isLink) { return NOLINK; }
  else if (state.isFocus) { return LINK_FOCUS;}
  else {return LINK_NOFOCUS;}
};
