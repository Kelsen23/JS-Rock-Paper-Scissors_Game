

    let score = JSON.parse(localStorage.getItem('score')) ||  {
      Wins: 0,
      Losses: 0,
      Ties: 0
    }

  updateScoreElem();

  let isAutoPlaying = false;
  let intervalId;

  function autoPlay() {

    if (!isAutoPlaying) {

      intervalId = setInterval(() => {

        const playerMove = pickComputerMove();
  
        playGame(playerMove);

        document.querySelector('.js-autoPlay-button').innerText = 'Stop Play';
      
      }, 1000);
      isAutoPlaying = true;
    } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
      document.querySelector('.js-autoPlay-button').innerText = 'Auto Play';
    }

  }

  document.querySelector('.js-rock').addEventListener('click', () => {
    playGame('rock');
  });

  document.querySelector('.js-paper').addEventListener('click', () => {
    playGame('paper');
  });

  document.querySelector('.js-scissors').addEventListener('click', () => {
    playGame('scissors');
  });

  document.querySelector('.js-reset').addEventListener('click', () => {

      showResetConfirmation();

  })

  function showResetConfirmation() {

    document.querySelector('.resetScoreWarn-container').innerHTML = 

    `<div>
      Are you sure you want to reset  your score?
      <button class="reset-score-button js-confirm-yes">Yes</button>
      <button class="reset-score-button js-confirm-no">No</button>
    </div>`;

    document.querySelector('.js-confirm-yes').addEventListener('click', () => {
      resetScore();
      updateScoreElem();
      document.querySelector('.resetScoreWarn-container').innerHTML = ``;
    })

    document.querySelector('.js-confirm-no').addEventListener('click', () => {
      document.querySelector('.resetScoreWarn-container').innerHTML = ``;
    })

  }

  document.querySelector('.js-autoPlay-button').addEventListener('click', () => {
    autoPlay();
  })

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
      playGame('rock');
    } else if (event.key === 'p') {
      playGame('paper');
    } else if (event.key === 's') {
      playGame('scissors');
    } else if (event.key === 'a') {
      autoPlay();
    } else if (event.key === 'Backspace') {
      resetScore();
      updateScoreElem();
    }
  });

  function playGame (playerMove) {

  const computerMove = pickComputerMove();
  
  let result = '';

    if(playerMove === 'scissors') {

        if (computerMove === 'rock') {
        result = 'You lose';
      } else if (computerMove === 'paper') {
        result = 'You win';
      } else if (computerMove === 'scissors') {
        result = 'Tie';
      }

    } else if (playerMove === 'paper') {

      if (computerMove === 'rock') {
        result = 'You win';
    } else if (computerMove === 'paper') {
        result = 'Tie';
    } else if (computerMove === 'scissors') {
        result = 'You lose';
    }

    } else if (playerMove === 'rock') {

      if (computerMove === 'rock') {
        result = 'Tie';
      } else if (computerMove === 'paper') {
        result = 'You lose';
      } else if (computerMove === 'scissors') {
        result = 'You win';
      }

    } 

    document.querySelector('.js-result').innerHTML = `${result}.`;
    document.querySelector('.js-moves').innerHTML = `
    You <img src = "Images/${playerMove}.png" class="img">
    Computer <img src="Images/${computerMove}.png" class="img">`;

    if (result === 'You win') {
      score.Wins += 1;
    } else if (result === 'You lose') {
      score.Losses += 1; 
    } else if (result === 'Tie') {
      score.Ties += 1;
    }

    updateScoreElem();

    localStorage.setItem('score', JSON.stringify(score));

  }

  function updateScoreElem () {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.Wins},
    Losses: ${score.Losses}, Ties: ${score.Ties}`;
  }

  let computerMove = '';

  function pickComputerMove () {

  const randomNumber = Math.random();


  if (randomNumber >= 0 && randomNumber < 1/3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3){
      computerMove = 'paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1){
      computerMove = 'scissors';
    }
    return computerMove;
  }

  function resetScore() {


    score.Wins = 0;
    score.Losses = 0;
    score.Ties = 0;
  } 

