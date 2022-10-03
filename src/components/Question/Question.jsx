import React, { useState } from 'react';
import Button from '../Button/Button';
import { setSessionStorage } from '../../utils/storage';
import './Question.css';

//we are passing two props data and submitted, data is what we are getting from API and if the form is submitted we dont't want user to access the option buttons again
function Question({ data, submitted }) {
  // this state is setting the current option that user clicks.
  const [selectedOption, setSelectedOption] = useState(null);

  //when click happens on any option, this is setting the state 'selectedOption' as that option value.
  function selectOption(event) {
    setSelectedOption(event.target.dataset.option);
    setSessionStorage('answers', { [data.id]: event.target.dataset.option });
  }

  //if the quiz is submitted then return this, the button will not work as there is no 'onclick'.
  if (submitted === true) {
    return (
      <div className='main-container'>
        <div className='question-text'>{data.question}</div>
        <div className='option-container'>
          {data.options.map(option => {
            return (
              <Button
                key={option}
                text={option}
                className={`${
                  option === data.correct_answer
                    ? 'correct'
                    : selectedOption === option
                    ? 'wrong'
                    : ''
                }`}
              />
            );
          })}
        </div>
      </div>
    );
  }

  //if form is still not submitted, this is going to get returned, clicking any button will invoke 'selectOption' function above.
  return (
    <div className='main-container'>
      <div className='question-text'>{data.question}</div>
      <div className='option-container'>
        {data.options.map(option => {
          return (
            <Button
              key={option}
              text={option}
              data-option={option}
              onClick={selectOption}
              className={`${selectedOption === option ? 'selected' : ''}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Question;
