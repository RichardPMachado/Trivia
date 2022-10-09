import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchGame } from '../redux/actions';
import Loading from '../components/Loading';

class Game extends React.Component {
  state = {
    questions: [],
    correctAnswer: '',
    answers: [],
    isLoading: true,
    isRedirect: false,
  };

  componentDidMount() {
    this.fetchGameQuest();
  }

  fetchGameQuest = async () => {
    const { results, responseCode } = await fetchGame();
    console.log(results);
    if (responseCode === 0) {
      this.setState({
        correctAnswer: results[0].correct_answer,
      });
      const numberAux = 1;
      const toSorted = [
        results[0].correct_answer, ...results[0].incorrect_answers];
      const randomSequence = toSorted.sort(() => Math.random() - numberAux);
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

  render() {
    const { questions, correctAnswer, answers, isLoading, isRedirect } = this.state;
    // console.log(questions)
    return (
      <div>
        <Header />
        {isLoading ? <Loading />
          : (
            <section>
              <p data-testid="question-category">{questions[0].category}</p>
              <p data-testid="question-text">{ questions[0].question}</p>
              <span data-testid="answer-options">
                {
                  answers.map((answer, index) => (
                    <button
                      type="button"
                      key={ index }
                      data-testid={
                        answer === correctAnswer
                          ? 'correct-answer' : `wrong-answer-${index}`
                      }
                    >
                      { answer }
                    </button>
                  ))
                }
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

// const mapDispatchToProps = (dispatch) => ({
//   dispatchError: () => dispatch(actLogout()),
// });

export default connect()(Game);

// Game.propTypes = {
//   // emailProps: PropTypes.string,
//   // nameProps: PropTypes.string,
//   // tokenProps: PropTypes.string,
//   isLoading: PropTypes.bool,
//   isRedirect: PropTypes.bool,
// }.isRequire;
