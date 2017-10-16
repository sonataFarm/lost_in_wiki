import {connect} from 'react-redux';
import {
  updateCurrentPage,
  updateFocusPage
} from '../../actions/game-actions';
import LinkFlow from './link-flow';

const mapStateToProps = state => ({
  pages: state.pages,
  game: state.game
});

const mapDispatchToProps = dispatch => ({
  updateCurrentPage: title => dispatch(updateCurrentPage(title)),
  updateFocusPage: title => dispatch(updateFocusPage(title))
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkFlow);
