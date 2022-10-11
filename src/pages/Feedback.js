import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class feedback extends React.Component {
  render() {
    const { score, assertions } = this.props;
    const num = 3;
    let text = '';
    if (score < num) {
      text = 'Could be better...';
    } else {
      text = 'Well Done!';
    }
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">{ text }</h1>
        <h2 data-testid="feedback-total-question">
          {assertions}
        </h2>
        <h2 data-testid="feedback-total-score">
          {score}
        </h2>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </Link>

      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,

});

feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(feedback);
