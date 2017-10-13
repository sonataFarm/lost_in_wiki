import {connect} from 'react-redux';
import {startNewGame, finishGame} from '../../actions/game_actions';
import GameInfo from './game-info';
const mapStateToProps = state => ({
  game: state.game
});

const mapDispatchToProps = dispatch => ({
  startNewGame: (originTitle, destinationTitle, difficulty) => (
    dispatch(startNewGame(originTitle, destinationTitle, difficulty))
  ),
  finishGame: () => (
    dispatch(finishGame())
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(GameInfo);
