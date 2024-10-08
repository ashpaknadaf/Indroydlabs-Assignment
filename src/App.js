import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './App.css'; 

function App() {
  const questions = [
    {
      question: 'What is the capital of India?',
      options: ['Mumbai', 'Delhi', 'Chennai', 'Kolkata'],
      correct: 'Delhi',
      prize: '$1000'
    },
    {
      question: 'Who is the CEO of Tesla?',
      options: ['Jeff Bezos', 'Elon Musk', 'Bill Gates', 'Mark Zuckerberg'],
      correct: 'Elon Musk',
      prize: '$2000'
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correct: 'Mars',
      prize: '$3000'
    },
    {
      question: 'Which is the largest mammal?',
      options: ['Elephant', 'Blue Whale', 'Giraffe', 'Shark'],
      correct: 'Blue Whale',
      prize: '$4000'
    },
    {
      question: 'Who wrote "Harry Potter"?',
      options: ['J.K. Rowling', 'J.R.R. Tolkien', 'George R.R. Martin', 'Stephen King'],
      correct: 'J.K. Rowling',
      prize: '$5000'
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [hasJoined, setHasJoined] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [totalPrize, setTotalPrize] = useState(0);
  const qrCodeURL = "https://courageous-profiterole-777f44.netlify.app/";

  const handleSubmitAnswer = () => {
    if (playerAnswer === questions[currentQuestion].correct) {
      setIsCorrect(true);
      setTotalPrize(totalPrize + parseInt(questions[currentQuestion].prize.slice(1)));
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameOver(true);
      }
      setIsCorrect(null);
      setPlayerAnswer('');
    }, 2000);
  };

  const handleJoinGame = () => {
    if (playerName.trim() !== '') {
      setHasJoined(true);
    }
  };

  return (
    <div className="App">
      <div className="game-container">

        {!hasJoined ? (
          <div className="join-section">
            <h1 className="game-title">KBC GAME</h1>
            <QRCodeSVG value={qrCodeURL} size={250} className="qr-code" />
            <p className="instructions">Scan the QR Code to join the game on your mobile!</p>
            <div className="name-input-section">
              <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="name-input"
              />
              <button onClick={handleJoinGame} className="join-button">Join Game</button>
            </div>
          </div>
        ) : gameOver ? (
          <div className="game-over-section">
            <h2>Game Over!</h2>
            <img src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png" alt="Trophy" className="trophy-image" />
            <p className='result-text'>Thank you for playing, {playerName}!</p>
            <p className='result-text'>You answered {currentQuestion} questions correctly.</p>
            <p className='result-text'>Your total prize money: <span className='total-price-text'>${totalPrize}</span></p>
          </div>
        ) : (
          <div className="question-section">
            <h2 className='welcome-text'>Welcome, {playerName}!</h2>
            <div className="question-container">
              <p className='question-text'>{questions[currentQuestion].question}</p>
              <p className="prize-money">Prize Money: {questions[currentQuestion].prize}</p>
              <ul className="options-list">
                {questions[currentQuestion].options.map((option, index) => (
                  <li key={index}>
                    <button
                      className={`option-button ${
                        playerAnswer === option ? (isCorrect ? 'correct' : 'incorrect') : ''
                      }`}
                      onClick={() => setPlayerAnswer(option)}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={handleSubmitAnswer} className="submit-button">Submit Answer</button>

            {isCorrect === true && <p className="success-message">Congratulations {playerName}!  You Won ${totalPrize}</p>}
            {isCorrect === false && <p className="error-message">Wrong Answer! Try again.</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
