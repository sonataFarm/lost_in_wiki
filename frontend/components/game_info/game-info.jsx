import React from 'react';

class GameInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.game.won && nextProps.game.won) {
      this.props.gameWon();
    }
  }

  render() {
    return(
      <div className='game-info'>
        <ul>
          <li>
            Destination: {this.props.destination.title}
          </li>
          <li>
            Steps Taken: {this.props.history.length - 1}
          </li>
          <li>
            Current Page: {this.props.currentPage.title}
          </li>
        </ul>
      </div>
    );
  }
}

export default GameInfo;
