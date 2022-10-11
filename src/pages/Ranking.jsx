import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    const { rankingProps } = this.state;
    return (
      <div>
        <h2>Ranking</h2>
        <table>
          <tr>
            <th>Posição</th>
            <th>Nome</th>
            <th>Pontuação</th>
          </tr>
          <tbody>
            <tr>
              { rankingProps.map((e) => (

                <td key={}>{ e }</td>

              ))}
            </tr>
          </tbody>
        </table>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  rankingProps: state.player.ranking,
});

export default connect(mapStateToProps)(Ranking);
