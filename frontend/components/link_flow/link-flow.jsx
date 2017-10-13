import React from 'react';
import CoverFlow from 'coverflow-react';
import Page from '../../util/wiki/page';

const IMG_FILL = 'https://hyperallergic.com/wp-content/uploads/2015/11/Allais_blacksquare-HOME.jpg';
const HEIGHT = 80;
const WIDTH_AS_PERCENTAGE_OF_WINDOW = 0.8;
const ITEM_RATIO = '10:1';
const BACKGROUND_CLR = 'grey';

// !!! testing and debugging
const pages = [
  new Page('Hitler'),
  new Page('Grandma'),
  new Page('Pederasty'),
  new Page('N,N-Dimethyltryptamine'),
  new Page('USA')
];

const images = new Array(pages.length);
images.fill(IMG_FILL);

const labels = pages.map(page => page.title);
// !!! end

class LinkFlow extends React.Component {
  constructor(props) {
    super(props);
    // this.img_fills = this.props.links.map(link => IMG_FILL); !!! uncomment when connected
  }

  options = {
    height: HEIGHT,
    width: Math.floor(window.innerWidth * WIDTH_AS_PERCENTAGE_OF_WINDOW),
    itemRatio: ITEM_RATIO,
    background: BACKGROUND_CLR
  }

  handleSelect = idx => console.log(idx);

  render() {
    return (
      <CoverFlow
        imagesArr={ images } // !!! replace with this.img_fills
        labelsArr={ labels } // !!! replace with this.props.links
        handleSelect={ this.handleSelect }
        { ...this.options }
      />
    );
  }
}

export default LinkFlow;
