import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './CSS/feedback.css';

class feedback extends React.Component {
  render() {
    const { score, assertions } = this.props;
    const num = 3;
    let text = '';
    if (assertions < num) {
      text = 'Could be better...';
    } else {
      text = 'Well Done!';
    }
    return (
      <div>
        <Header />
        <div className="feedback">
          <h1 data-testid="feedback-text">{ text }</h1>
          <h2 data-testid="feedback-total-question">
            Acerto:
            {' '}
            {assertions}
          </h2>
          <h2 data-testid="feedback-total-score">
            Pontos:
            {' '}
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
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
            >
              Ranking
            </button>
          </Link>
        </div>
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
