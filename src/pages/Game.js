import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchGame, counterPointers } from '../redux/actions';
import Loading from '../components/Loading';
import './Game.css';

class Game extends React.Component {
  state = {
    questions: [],
    correctAnswer: '',
    answers: [],
    isLoading: true,
    isRedirect: false,
    isDisabled: true,
    borderColorButton: [],
    questionsResponse: 0,
  };

  componentDidMount() {
    this.fetchGameQuest();
  }

  shuffleArray = (arr) => {
  // Loop em todos os elementos
  for (let i = arr.length - 1; i > 0; i--) {
    // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Retornando array com aleatoriedade
  return arr;
}

fetchGameQuest = async () => {
  const { results, responseCode } = await fetchGame();
  console.log(results);
  if (responseCode === 0) {
    const toSorted = [];
    results.forEach((e, index) => {
      toSorted[index] = {
        responses: [e.correct_answer, ...e.incorrect_answers]
      }
    });

    const numberAux = 0.3;
    const randomSequence = toSorted.map((e) => {
      console.log(e.responses)
      // e.responses.sort(() => Math.random() - numberAux);
    });
    console.log(randomSequence)



    this.setState({
      correctAnswer: results[0].correct_answer,
    });

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

handleClick = (correctAnswer, answers, index) => {
  const { dispatchPoint } = this.props;
  const { questions } = this.state;
  console.log(questions);
  let test = [];
  answers.forEach((element) => {
    if (correctAnswer === element) {
      test = [...test, 'correct-answer'];
    } else {
      test = [...test, 'incorrect-answer'];
    }
  });
  this.setState({ borderColorButton: [...test], isDisabled: false });
  console.log(questions[index].difficulty);
  if (answers[index] === correctAnswer) {
    dispatchPoint();
  }
};

handleNext = () => {
  this.setState({
    questionsResponse: this.state.questionsResponse + 1
  })
};

render() {
  const { questions, correctAnswer, answers,
    isLoading, isRedirect, isDisabled,
    borderColorButton, questionsResponse } = this.state;
  // console.log(questions)
  return (
    <div>
      <Header />
      {isLoading ? <Loading />
        : (
          <section>
            <p data-testid="question-category">{questions[questionsResponse].category}</p>
            <p data-testid="question-text">{questions[questionsResponse].question}</p>
            <span data-testid="answer-options">
              {
                answers.map((answer, index) => (
                  <button
                    type="button"
                    key={index}
                    className={isDisabled ? 'button' : borderColorButton[index]}
                    onClick={() => this.handleClick(correctAnswer, answers, index)}
                    data-testid={
                      answer === correctAnswer
                        ? 'correct-answer' : `wrong-answer-${index}`
                    }
                  >
                    {answer}
                  </button>
                ))
              }
              <br />
              <br />
              <button
                className="btn-next-question"
                type="button"
                data-testid="btn-next"
                onClick={this.handleNext}
              >
                Next
              </button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchPoint: (payload) => dispatch(counterPointers(payload)),
  }
  // dispatchError: () => dispatch(actLogout()),
};

export default connect(null, mapDispatchToProps)(Game);

// Game.propTypes = {
//   // emailProps: PropTypes.string,
//   // nameProps: PropTypes.string,
//   // tokenProps: PropTypes.string,
//   isLoading: PropTypes.bool,
//   isRedirect: PropTypes.bool,
// }.isRequire;
