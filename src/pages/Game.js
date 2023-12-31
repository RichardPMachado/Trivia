import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchGame, counterPointers, restartGameRequest } from '../redux/actions';
import Loading from '../components/Loading';
import './Game.css';

const num = 4;
const trinta = 30;
class Game extends React.Component {
  state = {
    questions: [],
    // correctAnswer: '',
    answers: [],
    isLoading: true,
    isRedirect: false,
    isDisabled: true,
    borderColorButton: [],
    questionsResponse: 0,
    breakTimer: false,
  };

  componentDidMount() {
    const { restartGameDispatch } = this.props;
    restartGameDispatch();

    this.fetchGameQuest();
    this.cronometroTimer(trinta);
  }

  // shuffleArray = (arr) => {
  // // Loop em todos os elementos
  //   for (let i = arr.length - 1; i > 0; i--) {
  //   // Escolhendo elemento aleatório
  //     const j = Math.floor(Math.random() * (i + 1));
  //     // Reposicionando elemento
  //     [arr[i], arr[j]] = [arr[j], arr[i]];
  //   }
  //   // Retornando array com aleatoriedade
  //   return arr;
  // };

  fetchGameQuest = async () => {
    const { results, responseCode } = await fetchGame();
    // console.log(results);
    if (responseCode === 0) {
      const toSorted = [];
      results.forEach((e, index) => {
        toSorted[index] = {
          responses: [e.correct_answer, ...e.incorrect_answers],
        };
      });

      // console.log('toSorted', toSorted); // Tem apenas as respostas, dentro do toSorted.responses (array de strings)
      // console.log('results', results); // Tem as perguntas e respostas

      const numberAux = 0.3;
      const randomSequence = toSorted.map(
        (e) => e.responses.sort(() => Math.random() - numberAux),
      );

      // this.setState({
      //   correctAnswer: results[0].correct_answer,
      // });

      this.setState({
        questions: results,
        answers: randomSequence,
        isLoading: false,
      });
    } else {
      localStorage.clear();
      this.setState({ isRedirect: true });
    // throw new Error('Token Invalid');
    }
  };

  cronometroTimer = (thirtySeconds) => {
    this.setState({ totalSeconds: thirtySeconds }, () => {
      const second = 1000;
      const idInterval = setInterval(() => {
        this.setState((prevState) => ({
          totalSeconds: prevState.totalSeconds - 1,
        }), () => {
          const { totalSeconds, breakTimer } = this.state;
          if (totalSeconds === 0 || breakTimer) {
            clearInterval(idInterval);
          }
        });
      }, second);
    });
  };

  handleClick = (correctAnswer, answers, index) => {
    const { dispatchPoint } = this.props;
    const { totalSeconds, questions, questionsResponse } = this.state;
    const level = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    let test = [];
    answers.forEach((element) => {
      if (correctAnswer === element) {
        test = [...test, 'correct-answer'];
      } else {
        test = [...test, 'incorrect-answer'];
      }
    });
    this.setState({ borderColorButton: [...test], isDisabled: false, breakTimer: true });
    const { difficulty } = questions[questionsResponse];
    if (answers[index] === correctAnswer) {
      dispatchPoint({ timerPoint: totalSeconds, levelPoint: level[difficulty] });
    }
  };

  handleNext = () => {
    const { questionsResponse } = this.state;
    const { history } = this.props;
    if (questionsResponse === num) {
      history.push('/feedback');
    }
    this.setState({
      questionsResponse: questionsResponse + 1,
      borderColorButton: [],
      breakTimer: false,
    });
    this.cronometroTimer(trinta);
  };

  render() {
    const { questions, answers, totalSeconds,
      isLoading, isRedirect, isDisabled,
      borderColorButton, questionsResponse } = this.state;
    // const intervalo = 25;
    return (
      <div className="game_page">
        <Header />
        {isLoading ? <Loading />
          : (
            <section className="section">
              <p>{totalSeconds}</p>
              <p
                className="question-category"
                data-testid="question-category"
              >

                {questions[questionsResponse].category}
              </p>
              <p
                className="question-text"
                data-testid="question-text"
              >
                {questions[questionsResponse].question}

              </p>
              <span
                data-testid="answer-options"
              >
                {
                  answers[questionsResponse].map((answer, index) => (
                    <button
                      type="button"
                      key={ index }
                      className={ isDisabled ? 'button' : borderColorButton[index] }
                      disabled={ totalSeconds === 0 }
                      onClick={ () => this.handleClick(
                        questions[questionsResponse].correct_answer,
                        answers[questionsResponse],
                        index,
                      ) }
                      data-testid={
                        answer === questions[questionsResponse].correct_answer
                          ? 'correct-answer' : `wrong-answer-${index}`
                      }
                    >
                      {answer}
                    </button>
                  ))
                }
                <br />
                <br />
                {borderColorButton.length > 0 || totalSeconds === 0 ? (
                  <button
                    className="btn-next-question"
                    type="button"
                    data-testid="btn-next"
                    onClick={ this.handleNext }
                  >
                    Next
                  </button>
                ) : null }
              </span>
            </section>
          )}
        {isRedirect && <Redirect to="/" />}
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
// //   emailProps: state.playerReducer.gravatarEmail,
// //   nameProps: state.playerReducer.name,
// //   tokenProps: state.playerReducer.token,
//   isLoading: state.playerReducer.isLoading,
//   isRedirect: state.playerReducer.isRedirect,
// });

const mapDispatchToProps = (dispatch) => ({
  dispatchPoint: (payload) => dispatch(counterPointers(payload)),
  restartGameDispatch: () => dispatch(restartGameRequest()),
});
// dispatchError: () => dispatch(actLogout()),;

export default connect(null, mapDispatchToProps)(Game);

Game.propTypes = {
  dispatchPoint: PropTypes.func.isRequired,
  restartGameDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

//   // emailProps: PropTypes.string,
//   // nameProps: PropTypes.string,
//   // tokenProps: PropTypes.string,
//   isLoading: PropTypes.bool,
//   isRedirect: PropTypes.bool,
// }.isRequire;
