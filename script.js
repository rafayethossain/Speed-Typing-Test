// Get references to DOM elements
const passageDisplay = document.getElementById('passage-display');
const typingInput = document.getElementById('typing-input');
const passageSelect = document.getElementById('passage-select');
const restartBtn = document.getElementById('restart-btn');
const newPassageBtn = document.getElementById('new-passage-btn');
const virtualKeyboard = document.getElementById('virtual-keyboard');
const completionModal = document.getElementById('completion-modal');
const modalWPM = document.getElementById('modal-wpm');
const modalAccuracy = document.getElementById('modal-accuracy');
const modalTime = document.getElementById('modal-time');
const modalCorrectChars = document.getElementById('modal-correct-chars');
const modalIncorrectChars = document.getElementById('modal-incorrect-chars');
const modalTotalTyped = document.getElementById('modal-total-typed');
const modalContinueSameBtn = document.getElementById('modal-continue-same-btn');
const modalStartNextBtn = document.getElementById('modal-start-next-btn');
const wpmDisplay = document.getElementById('wpm-display');
const accuracyDisplay = document.getElementById('accuracy-display');
const timeDisplay = document.getElementById('time-display');












// Map of keyboard event.code to virtual key IDs
const keyboardMap = {
    'Backquote': '`',
    'Digit1': '1',
    'Digit2': '2',
    'Digit3': '3',
    'Digit4': '4',
    'Digit5': '5',
    'Digit6': '6',
    'Digit7': '7',
    'Digit8': '8',
    'Digit9': '9',
    'Digit0': '0',
    'Minus': '-',
    'Equal': '=',
    'Backspace': 'Backspace',
    'Tab': 'Tab',
    'KeyQ': 'Q',
    'KeyW': 'W',
    'KeyE': 'E',
    'KeyR': 'R',
    'KeyT': 'T',
    'KeyY': 'Y',
    'KeyU': 'U',
    'KeyI': 'I',
    'KeyO': 'O',
    'KeyP': 'P',
    'BracketLeft': '[',
    'BracketRight': ']',
    'Backslash': '\\',
    'CapsLock': 'CapsLock',
    'KeyA': 'A',
    'KeyS': 'S',
    'KeyD': 'D',
    'KeyF': 'F',
    'KeyG': 'G',
    'KeyH': 'H',
    'KeyJ': 'J',
    'KeyK': 'K',
    'KeyL': 'L',
    'Semicolon': ';',
    'Quote': '\'',
    'Enter': 'Enter',
    'ShiftLeft': 'ShiftLeft',
    'KeyZ': 'Z',
    'KeyX': 'X',
    'KeyC': 'C',
    'KeyV': 'V',
    'KeyB': 'B',
    'KeyN': 'N',
    'KeyM': 'M',
    'Comma': ',',
    'Period': '.',
    'Slash': '/',
    'ShiftRight': 'ShiftRight',
    'Space': 'Space'
};

// Get all virtual keyboard key elements
const virtualKeys = {};
for (const code in keyboardMap) {
    const keyElement = virtualKeyboard.querySelector(`[data-key="${code}"]`);
    if (keyElement) {
        virtualKeys[code] = keyElement;
    }
}

const passages = [
    "The quick brown fox jumps over the lazy dog.",
    "Sphinx of black quartz, judge my vow.",
    "How vexingly quick daft zebras jump!",
    "The five boxing wizards jump quickly.",
    "Bright vixens jump; dozy fowl quack.",
    "He promptly judged the two fake ivory statues.",
    "A wizard's job is to vex chumps quickly in fog.",
    "Few black taxis drive up major roads on quiet hazy nights.",
    "The job of waxing linoleum frequently peeves chintzy kids.",
    "All questions asked by five watched experts amaze the judge."
];

// State variables for the typing test
let currentPassage = '';
let characterIndex = 0; // Tracks the current character being typed
let correctCharacters = 0; // Counts correctly typed characters
let incorrectCharacters = 0; // Counts incorrectly typed characters
let totalCharactersTyped = 0; // Total characters typed (correct + incorrect)
let startTime; // Stores the timestamp when the test starts
let endTime; // Stores the timestamp when the test ends
let timerInterval; // Stores the interval ID for the live timer

/**
 * Loads a given text passage into the display area and resets test state.
 * @param {string} passage - The text passage to load.
 */
function loadPassage(passage) {
    
    currentPassage = passage;
    passageDisplay.innerHTML = ''; // Clear previous passage content
    // Create a span element for each character to allow individual styling
    passage.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            passageDisplay.appendChild(span);
            console.log('Character:', char, 'Span:', span);
        });
    // Reset all test-related variables
    characterIndex = 0;
    correctCharacters = 0;
    incorrectCharacters = 0;
    totalCharactersTyped = 0; // Reset for new test
    
    updateCurrentCharacterHighlight(); // Highlight the first character
    typingInput.value = ''; // Clear the user's input field
    typingInput.disabled = false; // Enable the input field
    typingInput.focus(); // Focus the input field
    startTime = null;
    endTime = null;
    clearInterval(timerInterval); // Stop any active timer
    updateMetricsDisplay(0, 0, 0); // Reset displayed metrics to zero
    completionModal.classList.add('hidden'); // Hide modal on new test
}

// Ensure typing input stays focused when clicking on the passage display
passageDisplay.addEventListener('click', () => {
    typingInput.focus();
    console.log('Passage display clicked, typing input focused.');
});

/**
 * Updates the visual highlight for the current character to be typed.
 * Removes highlights from all characters and applies 'current' class to the active one.
 */
function updateCurrentCharacterHighlight() {
    const characters = passageDisplay.querySelectorAll('span');
    console.log('Updating current character highlight for index:', characterIndex, 'Characters NodeList:', characters);
    // Remove all existing 'current' highlight classes
    characters.forEach((charSpan) => {
        charSpan.classList.remove('current');
    });
    // Apply 'current' class to the character at the current index, if within bounds
    if (characterIndex < characters.length) {
        characters[characterIndex].classList.add('current');
    }
}

/**
 * Calculates Words Per Minute (WPM) based on total characters typed and time elapsed.
 * A word is considered 5 characters.
 * @param {number} timeInSeconds - The time elapsed in seconds.
 * @returns {number} Calculated WPM.
 */
function calculateWPM(timeInSeconds) {
    if (timeInSeconds === 0) return 0;
    const charactersForWPM = totalCharactersTyped;
    const wordsTyped = charactersForWPM / 5;
    return Math.round((wordsTyped / timeInSeconds) * 60);
}

/**
 * Calculates Net Words Per Minute (Net WPM) by subtracting errors from Gross WPM.
 * @param {number} timeInSeconds - The time elapsed in seconds.
 * @returns {number} Calculated Net WPM.
 */
function calculateNetWPM(timeInSeconds) {
    if (timeInSeconds === 0) return 0;
    const grossWPM = calculateWPM(timeInSeconds);
    const errorsPerMinute = (incorrectCharacters / (timeInSeconds / 60));
    return Math.round(grossWPM - errorsPerMinute);
}

/**
 * Calculates typing accuracy as a percentage.
 * @returns {number} Calculated accuracy percentage.
 */
function calculateAccuracy() {
    const totalTyped = correctCharacters + incorrectCharacters;
    if (totalTyped === 0) return 0;
    return Math.round((correctCharacters / totalTyped) * 100);
}

/**
 * Formats time from seconds into MM:SS string format.
 * @param {number} timeInSeconds - The time elapsed in seconds.
 * @returns {string} Formatted time string (MM:SS).
 */
function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Updates the displayed WPM, Accuracy, and Time metrics on the UI.
 * @param {number} wpm - Words Per Minute to display.
 * @param {number} accuracy - Accuracy percentage to display.
 * @param {number} time - Time elapsed in seconds to display.
 */
function updateMetricsDisplay(wpm, accuracy, time) {
    console.log('Updating metrics: WPM=', wpm, 'Accuracy=', accuracy, 'Time=', time);
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = `${accuracy}%`;
    timeDisplay.textContent = formatTime(time);

    // Update modal stats as well
    modalWPM.textContent = wpm;
    modalAccuracy.textContent = `${accuracy}%`;
    modalTime.textContent = formatTime(time);
    modalCorrectChars.textContent = correctCharacters;
    modalIncorrectChars.textContent = incorrectCharacters;
    modalTotalTyped.textContent = totalCharactersTyped;
}

// Populate passage selection dropdown with options for each passage
passages.forEach((passage, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = passage.substring(0, 30) + (passage.length > 30 ? '...' : ''); // Display a snippet of the passage
    passageSelect.appendChild(option);
});

// Event listener for when a new passage is selected from the dropdown
passageSelect.addEventListener('change', (e) => {
    loadPassage(passages[e.target.value]); // Load the selected passage
});



// Event listener for the Restart Test button
restartBtn.addEventListener('click', () => {
    loadPassage(currentPassage); // Reload the current passage to restart the test
});

// Event listener for the New Passage button
newPassageBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * passages.length); // Get a random passage index
    loadPassage(passages[randomIndex]); // Load the randomly selected passage
    passageSelect.value = randomIndex; // Update the dropdown to show the newly loaded passage
});



// Initial load of the first passage when the page loads
loadPassage(passages[0]);

typingInput.addEventListener('input', (e) => {
    console.log('Input event fired. Current value:', e.target.value);
    // Start the timer on the very first keystroke
    if (!startTime) {
        startTime = new Date().getTime();
        timerInterval = setInterval(() => {
            const currentTime = new Date().getTime();
            let timeElapsed = (currentTime - startTime) / 1000;
            updateMetricsDisplay(calculateWPM(timeElapsed), calculateAccuracy(), timeElapsed);
        }, 1000);
    }

    const typedText = typingInput.value;
    const characters = passageDisplay.querySelectorAll('span');
    console.log('Typed Text:', typedText);
    console.log('Character Index:', characterIndex);
    console.log('Correct Characters:', correctCharacters);
    console.log('Incorrect Characters:', incorrectCharacters);

    // Clear all existing correct/incorrect classes
    characters.forEach(charSpan => {
        charSpan.classList.remove('correct', 'incorrect');
    });

    // Update character classes based on typed input
    for (let i = 0; i < typedText.length; i++) {
        const expectedChar = currentPassage[i];
        const typedChar = typedText[i];

        if (typedChar === expectedChar) {
            characters[i].classList.add('correct');
        } else {
            characters[i].classList.add('incorrect');
        }
    }

    // Update characterIndex to the current length of typed text
    characterIndex = typedText.length;

    // Recalculate correct and incorrect characters based on current state
    correctCharacters = 0;
    incorrectCharacters = 0;
    totalCharactersTyped = typedText.length;

    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === currentPassage[i]) {
            correctCharacters++;
        } else {
            incorrectCharacters++;
        }
    }

    updateCurrentCharacterHighlight();

    // Check for passage completion
    if (characterIndex >= currentPassage.length) {
        endTime = new Date().getTime();
        const timeElapsed = (endTime - startTime) / 1000;
        const finalWPM = calculateWPM(timeElapsed);
        const finalNetWPM = calculateNetWPM(timeElapsed);
        const finalAccuracy = calculateAccuracy();
        updateMetricsDisplay(finalNetWPM, finalAccuracy, timeElapsed);
        typingInput.disabled = true;
        clearInterval(timerInterval);
        completionModal.classList.remove('hidden'); // Show the modal
    }
});

// Event listeners for modal buttons
modalContinueSameBtn.addEventListener('click', () => {
    completionModal.classList.add('hidden');
    loadPassage(currentPassage); // Restart with the same passage
});

modalStartNextBtn.addEventListener('click', () => {
    completionModal.classList.add('hidden');
    newPassageBtn.click(); // Simulate click on New Passage button
});

typingInput.addEventListener('keydown', (e) => {
    console.log('Keydown event fired. Key:', e.key, 'Code:', e.code);
    const virtualKey = virtualKeys[e.code];
    if (virtualKey) {
        virtualKey.classList.add('active');
    }
});

typingInput.addEventListener('keyup', (e) => {
    console.log('Keyup event fired. Key:', e.key, 'Code:', e.code);
    const virtualKey = virtualKeys[e.code];
    if (virtualKey) {
        virtualKey.classList.remove('active');
    }
});





