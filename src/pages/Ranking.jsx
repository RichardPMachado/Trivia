import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Ranking extends Component {
  toHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { nameProps } = this.state;
    return (
      <div>
        <Header />
        <h2 data-testid="ranking-title">Ranking</h2>
        <table>
          <tr>
            <th>Posição</th>
            <th>Nome</th>
            <th>Pontuação</th>
          </tr>
          <tbody>
            <tr>
              <td>1</td>
              <td>{ nameProps }</td>
              <td>3</td>
              {/* { rankingProps.map((e) => (

                <td key={}>{ e }</td>

              ))} */}
            </tr>
          </tbody>
        </table>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.toHome }
        >
          Home
        </button>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  rankingProps: state.player.ranking,
  nameProps: state.player.name,
});

export default connect(mapStateToProps)(Ranking);
Ranking.propTypes = {
  history: PropTypes.array,
  nameProps: PropTypes.string,
}.isRequired;
