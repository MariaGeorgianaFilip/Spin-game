const grid = document.querySelector('.grid');
const cells = Array.from(document.querySelectorAll('.cell'));

let betAmount: number;
let spinsRemaining = 4;
let matchedMultipliers: number[] = [];

function revealMultiplier(spunNumber: number) {
  const multiplier = getMultiplier();
  cells[spunNumber - 1].textContent = `x${multiplier}`;
}
  

function revealAllMultipliers() {
  cells.forEach((cell, index) => {
    if (cell.textContent === '') {
    const multiplier = getMultiplier();
    cell.textContent = `x${multiplier}`;
    }
    });
}

function handleKeyPress(event: KeyboardEvent) {
  if (event.key === ' ') {
    if (spinsRemaining > 0) {
      const spunNumber = Math.floor(Math.random() * 9) + 1;
      console.log(`Spinning... The result is ${spunNumber}!`);
      revealMultiplier(spunNumber);
      checkWinCondition(spunNumber);
      spinsRemaining--;
      console.log(`Spins remaining: ${spinsRemaining}`);
      if (spinsRemaining === 0) {
        revealAllMultipliers();
        endGame();
      }
    }
  }
}
  
function getMultiplier(): number {
  const availableMultipliers = [15, 16, 17, 18, 19, 20];
  const randomIndex = Math.floor(Math.random() * availableMultipliers.length);
  return availableMultipliers.splice(randomIndex, 1)[0];
}

function checkWinCondition(spunNumber: number) {
  const multiplier = parseFloat(cells[spunNumber - 1].textContent!.substring(1));
  if (matchedMultipliers.includes(multiplier)) {
    console.log(`Matched multiplier: x${multiplier}`);
  } else {
    matchedMultipliers.push(multiplier);
  }
}


function endGame() {
  let maxMultiplier = 0;
  if (matchedMultipliers.length >= 2) {
      matchedMultipliers.forEach(multiplier => {
        if (multiplier > maxMultiplier) {
          maxMultiplier = multiplier;
        }
      });
      const totalWinAmount = betAmount * maxMultiplier;
      console.log(`Congratulations! You won ${totalWinAmount} units (bet amount: ${betAmount} x matched multiplier: ${maxMultiplier}).`);
    } else {
      console.log('Game over. You did not match enough multipliers to win.');
    }
    document.removeEventListener('keypress', handleKeyPress);
}
  
function startGame() {
    const betAmountInput = prompt("Please enter your bet amount:");
    if (betAmountInput !== null) {
      betAmount = parseFloat(betAmountInput);
      console.log(`Bet Amount: ${betAmount}`);
      console.log('Press [SPACE] to spin.');
      document.addEventListener('keypress', handleKeyPress);
    } else {
      console.log('Invalid bet amount. Please refresh the page to start again.');
    }
  }
startGame();  




  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


          