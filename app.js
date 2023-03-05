// Define the keys, key signatures, and pool of notes
const keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const keySignatures = {
  'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
  'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
  'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
  'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
  'F': ['F', 'G', 'A', 'A#', 'C', 'D', 'E'],
  'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#']
};
const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B'];

// Get a random key signature
const randomKey = keys[Math.floor(Math.random() * keys.length)];
const keySignature = keySignatures[randomKey];

// Get a random note from the pool of notes that is in the key signature
const getRandomNoteInKey = () => {
  const note = notes[Math.floor(Math.random() * notes.length)];
  if (keySignature.includes(note)) {
    return note;
  } else {
    return getRandomNoteInKey();
  }
};
const correctNote = getRandomNoteInKey();

// Get two random notes from the pool of notes that are not in the key signature
const getIncorrectNotes = () => {
  const incorrectNotes = [];
  while (incorrectNotes.length < 2) {
    const note = notes[Math.floor(Math.random() * notes.length)];
    if (!keySignature.includes(note) && !incorrectNotes.includes(note)) {
      incorrectNotes.push(note);
    }
  }
  return incorrectNotes;
};
const incorrectNotes = getIncorrectNotes();

// Shuffle the placement of the correct note
const allNotes = [correctNote, ...incorrectNotes];
const shuffledNotes = allNotes.sort(() => Math.random() - 0.5);

// Add the shuffled notes to the buttons
const buttons = document.querySelectorAll('.note-button');
buttons[0].textContent = shuffledNotes[0];
buttons[1].textContent = shuffledNotes[1];
buttons[2].textContent = shuffledNotes[2];

// Add event listeners to the buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.textContent === correctNote) {
      button.classList.add('correct');
      alert('Congratulations, you guessed the correct note!');
    } else {
      button.classList.add('incorrect');
      setTimeout(() => {
        button.classList.remove('incorrect');
      }, 1000);
    }
  });
});
