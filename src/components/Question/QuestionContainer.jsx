import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Question from './Question';
import { getSessionStorage, removeSessionStorage } from '../../utils/storage';

function QuestionContainer() {
  //this is setting the questions we are getting from API as the value of this state.
  const [questionsData, setQuestionsData] = useState([]);

  //this state turns true if user submits the form by clicking 'check answer' button below and in question component disables the button.
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  //this is keeping count of score.
  const [score, setScore] = useState(0);

  //this function is randomizing the array of options we are getting from API. It takes that array consisting of both incorrect_answers and correct_answer as parameter. And returns random array.
  function shuffleOptions(optionsArr) {
    for (
      var j, x, i = optionsArr.length;
      i;
      j = parseInt(Math.random() * i),
        x = optionsArr[--i],
        optionsArr[i] = optionsArr[j],
        optionsArr[j] = x
    );
    return optionsArr;
  }

  //this function takes the array as parameter, we will be passing array we are getting as result from API, and then create new key as 'options' and 'value' as array of both incorrect_answers and correct_answer and also give each one a id. store this new array as 'data'.
  function addOptionAndID(arr) {
    const data = arr.map((option, i) => {
      return {
        ...option,
        options: shuffleOptions([...option.incorrect_answers, option.correct_answer]),
        id: i,
      };
    });
    return data;
  }

  // inside this we are fetching data from API, and then setting state for 'questionsData' as the results.
  useEffect(() => {
    async function getData() {
      const res = await fetch(
        'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple'
      );
      const { results } = await res.json();
      //here we are adding options and id as key inside 'result' array through addOptionAndID function.
      setQuestionsData(addOptionAndID(results));
    }
    getData();
  }, []);

  //this will run when user submits the quiz
  function submitQuiz() {
    //geting the earlier data from session storage and storing it.
    const selectedAnswers = getSessionStorage('answers');
    //removing earlier data from session storage for next game as we have alreay stored it in above variable.
    removeSessionStorage('answers');
    let scoreCount = 0;
    // 1. we are mapping over 'questionsData'(consisting of data from api with other keys like 'id' and 'options' array(all options in it)).
    //2. with each question, we are checking if 'correct_answer' property in it matches the 'selectedAnswers' we are getting from session storage and storing in const 'isAnswerCorrect'(boolean value).
    //3. if it is true, we are adding another property 'isAnswerRight' and its value as 'isAnswerCorrect'(i.e. wither true or false), also incrementing the scoreCount.
    //4. storing this new array as 'resultsArray', with new property 'isAnswerCorrect'.
    const resultsArray = questionsData.map((question, i) => {
      const isAnswerCorrect = question.correct_answer === selectedAnswers[i];
      question.isAnswerRight = isAnswerCorrect;
      if (isAnswerCorrect) scoreCount++;
      return question;
    });
    setQuestionsData(resultsArray);
    setSubmittedQuiz(true);
    setScore(scoreCount);
  }

  function restartQuiz() {
    window.location.reload();
  }

  return (
    <div className='questions'>
      {questionsData.map((questionData, i) => (
        <Question data={questionData} key={i} submitted={submittedQuiz} />
      ))}
      {submittedQuiz === false && (
        <Button
          text={'check Answer'}
          onClick={submitQuiz}
          style={{
            borderColor: '1px solid orange',
            color: 'orange',
            marginTop: '1rem',
            width: '15rem',
          }}
          className={'submit-btn'}
        />
      )}
      {submittedQuiz === true && <Button text={'play again'} onClick={restartQuiz} />}
      {submittedQuiz === true && (
        <p>{`You have scored ${score} out of ${questionsData.length} questions.`}</p>
      )}
    </div>
  );
}

export default QuestionContainer;
