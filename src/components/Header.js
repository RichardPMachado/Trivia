import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { criarImg } from '../redux/actions/index';
// import '../pages/CSS/header.css';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const profile = criarImg(gravatarEmail);

    return (
      <header className="header">
        <img
          className="profile"
          data-testid="header-profile-picture"
          src={ profile }
          alt="imagen do jogador"
        />
        <h2
          className="header-player-name"
          data-testid="header-player-name"
        >
          { name }

        </h2>
        <div className="pontos">
          <i className="bi bi-star-fill" />
          <h2 data-testid="header-score">
            { score }

          </h2>
        </div>
      </header>

    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
