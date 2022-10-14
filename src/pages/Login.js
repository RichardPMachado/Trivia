import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getUser, getApiToken } from '../redux/actions';
import './CSS/Login.css';
import logoTrivia from '../img/logo-trivia.png';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
    isRedirect: false,
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyBtn());
  };

  handleClickConfig = () => {
    const { history } = this.props;
    history.push('/config');
  };

  verifyBtn = () => {
    const { name, email } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const nameVerify = name.length > 0;
    const btnState = verifyEmail && nameVerify;
    this.setState({ isDisabled: !btnState });
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { addUser, tokenAction } = this.props;
    const { email, name } = this.state;
    const obj = {
      email, name,
    };
    addUser(obj);
    await tokenAction();
    const { tokenProps } = this.props;
    localStorage.setItem('token', tokenProps);
    this.setState({
      isRedirect: true,
    });
  };

  render() {
    const { name, email, isDisabled, isRedirect } = this.state;

    return (
      <div className="containerLogin">
        <img
          src={ logoTrivia }
          alt="logo trivia"
        />
        <form className="form_login">
          <label htmlFor="name">
            <input
              className="input-player-name"
              data-testid="input-player-name"
              type="text"
              name="name"
              placeholder="Digite seu nome"
              onChange={ this.handleInput }
              value={ name }
            />
          </label>
          <label htmlFor="email">
            <input
              className="input-gravatar-email"
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              placeholder="Digite seu email"
              onChange={ this.handleInput }
              value={ email }
            />
          </label>
          <button
            className="BTN_Login"
            type="submit"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            className="BTN_Config"
            data-testid="btn-settings"
            type="button"
            onClick={ this.handleClickConfig }
          >
            Configurações
          </button>
        </form>
        {isRedirect && <Redirect to="/game-page" /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tokenProps: state.player.token,
});

const mapDispatchToProps = (dispatch) => ({
  addUser: (state) => dispatch(getUser(state)),
  tokenAction: () => dispatch(getApiToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
Login.propTypes = {
  tokenAction: PropTypes.func.isRequired,
  tokenProps: PropTypes.string.isRequired,
  addUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
