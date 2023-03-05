// Define the key signatures and notes
const keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const keyNotes = {
  'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
  'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
  'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
  'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
  'F': ['F', 'G', 'A', 'A#', 'C', 'D', 'E'],
  'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#']
};

let currentKey;
let answerNotes;

// Initialize the game
function init() {
    console.log("Initializing event listeners...");

    // Add event listeners to the buttons
    const answerButton1 = document.getElementById('note1');
    const answerButton2 = document.getElementById('note2');
    const answerButton3 = document.getElementById('note3');
    answerButton1.addEventListener('click', handleGuess);
    answerButton2.addEventListener('click', handleGuess);
    answerButton3.addEventListener('click', handleGuess);
    
    const newGameButton = document.getElementById('new-game');
    newGameButton.addEventListener('click', newGame); // add this line to add the event listener for the "New Game" button
    
    newGame();
  }
  
  init();
  
// Generate a random note from the array
function generateRandomNote(key) {
  const randomNote = keyNotes[key][Math.floor(Math.random() * keyNotes[key].length)];
  return randomNote;
}

// Generate correct and incorrect answers
function generateAnswers(key) {
  // Generate correct answer
  const correctAnswer = generateRandomNote(key);
  answerNotes = [correctAnswer];

  // Generate incorrect answers
 // Generate incorrect answers
    let incorrectAnswer;
    while (answerNotes.length < 3) {
    // Pick a random key that doesn't equal the current key
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    if (randomKey !== key) {
        // Pick a random note from the random key that is not in the correct key
        const notesInRandomKey = keyNotes[randomKey];
        const notesInCorrectKey = keyNotes[key];
        const notesNotInCorrectKey = notesInRandomKey.filter(note => !notesInCorrectKey.includes(note));
        incorrectAnswer = notesNotInCorrectKey[Math.floor(Math.random() * notesNotInCorrectKey.length)];
        // Make sure the incorrect answer isn't already in the answerNotes array
        if (!answerNotes.includes(incorrectAnswer)) {
        answerNotes.push(incorrectAnswer);
        }
        }
    }
  // Shuffle the answerNotes array to randomize the placement of the answers
  answerNotes.sort(() => Math.random() - 0.5);
}

// Update the UI with the current key signature and answer buttons
function updateUI() {
  // Display the current key signature
  const keySignatureDiv = document.getElementById('key-signature');
  keySignatureDiv.textContent = `Key Signature: ${currentKey}`;

  // Display the answer buttons
  const answerButton1 = document.getElementById('note1');
  const answerButton2 = document.getElementById('note2');
  const answerButton3 = document.getElementById('note3');
  answerButton1.textContent = answerNotes[0];
  answerButton2.textContent = answerNotes[1];
  answerButton3.textContent = answerNotes[2];
}

// Start a new game
// Start a new game
function newGame() {
    // Pick a random key signature
    currentKey = keys[Math.floor(Math.random() * keys.length)];
  
    // Generate the answers
    generateAnswers(currentKey);
  
    // Update the UI
    updateUI();
  
    // Reset the score
    const scoreDiv = document.getElementById('score');
    scoreDiv.textContent = 'Score: 0';
  
    // Hide the "Next Round" button
    const nextRound = document.getElementById('next-round'); // change this line from "nextRoundButton" to "nextRound"
    nextRound.classList.add('hidden');
  }
// Handle the player's guess
function handleGuess(event) {
    const selectedNote = event.target.textContent;
  
    // If the selected note matches the current note, the player guessed correctly
    if (selectedNote === answerNotes[0]) {
      showMessage('Correct!');
      updateScore(1);
      playSound('correct');
    } else {
      showMessage('Incorrect! Try again.');
      playSound('incorrect');
    }
  
    // Generate new answers and update the UI
    generateAnswers(currentKey);
    updateUI();
  }

  
