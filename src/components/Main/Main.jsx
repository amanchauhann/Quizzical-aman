import React, { useState } from 'react';
import Button from '../Button/Button';
import QuestionContainer from '../Question/QuestionContainer';

function Main() {
  // if this state is 'true' the game will start or in lateral terms "<QuestionContainer /> component will run"
  const [isStarted, setIsStarted] = useState(false);

  // if above state is false then run this.
  if (!isStarted) {
    return (
      <div>
        <h1>Quizzical App</h1>
        <Button text='start quiz' onClick={() => setIsStarted(true)} />
      </div>
    );
  }

  //else run this

  return (
    <div>
      <h1>Quizzical App</h1>
      <QuestionContainer />;
    </div>
  );
}

export default Main;
