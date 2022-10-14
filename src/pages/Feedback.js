import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './CSS/feedback.css';
import addRanking from '../LocalStorage/localStorage';
import { criarImg } from '../redux/actions/index';

class feedback extends React.Component {
  handleClick = () => {
    const { playerName, gravatarEmail, score } = this.props;
    const profile = criarImg(gravatarEmail);
    addRanking({ score, playerName, profile });
  };

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
            {/* Acerto:
            {' '} */}
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
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ this.handleClick }
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
  playerName: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(feedback);
