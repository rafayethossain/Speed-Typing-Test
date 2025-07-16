# Work Breakdown Structure (WBS): Typing Master / Speed Tester

This document outlines the detailed, task-based plan for the development of the Typing Master / Speed Tester application, based on the provided Product Requirements Document (PRD).

## 1. Project Setup & Initialization (Phase 1)

*   **1.1. Environment Setup**
    *   1.1.1. Create project root directory.
    *   1.1.2. Initialize Git repository.
    *   1.1.3. Create `index.html` (main application entry point).
    *   1.1.4. Create `style.css` (for all styling).
    *   1.1.5. Create `script.js` (for all application logic).
    *   1.1.6. Link `style.css` and `script.js` in `index.html`.

## 2. Core Typing Test Engine (MVP - Phase 2)

*   **2.1. HTML Structure for Typing Area**
    *   2.1.1. Create a dedicated `div` for displaying the text passage.
    *   2.1.2. Create an input element (or similar) for user typing.
*   **2.2. CSS for Visual Feedback (FR-002)**
    *   2.2.1. Define CSS classes for `correct` character highlighting (e.g., green background/text).
    *   2.2.2. Define CSS classes for `incorrect` character highlighting (e.g., red background/text).
    *   2.2.3. Define CSS for `current` character indication (e.g., underline, border).
*   **2.3. JavaScript Logic**
    *   2.3.1. **Passage Loading & Display (FR-001)**
        *   2.3.1.1. Function to load a given text passage into the display area.
        *   2.3.1.2. Break down passage into individual characters/words for comparison.
    *   2.3.2. **Keyboard Input Handling (FR-002, FR-003)**
        *   2.3.2.1. Event listener for `keydown` or `keypress` events on the input area.
        *   2.3.2.2. Compare typed character with expected character.
        *   2.3.2.3. Apply `correct`/`incorrect` CSS classes based on comparison.
        *   2.3.2.4. Implement strict typing: prevent progression on error (FR-003).
        *   2.3.2.5. Update `current` character indicator.
    *   2.3.3. **Test Start/End Logic (FR-004)**
        *   2.3.3.1. Detect first keystroke to start timer and test.
        *   2.3.3.2. Detect completion of entire passage to stop timer and end test.
    *   2.3.4. **Time Tracking (FR-005)**
        *   2.3.4.1. Start timer on first keystroke.
        *   2.3.4.2. Stop timer on test completion.
        *   2.3.4.3. Store elapsed time.

## 3. Performance Metrics Display (MVP - Phase 3)

*   **3.1. HTML Elements for Metrics**
    *   3.1.1. Create display areas for Gross WPM, Net WPM, Accuracy, and Elapsed Time.
*   **3.2. JavaScript Calculation & Display**
    *   3.2.1. **Gross WPM Calculation (FR-006)**
        *   3.2.1.1. Function to calculate Gross WPM: (total characters typed / 5) / (time in minutes).
    *   3.2.2. **Net WPM Calculation (FR-007)**
        *   3.2.2.1. Function to calculate Net WPM: Gross WPM - (number of errors / time in minutes).
    *   3.2.3. **Accuracy Calculation (FR-008)**
        *   3.2.3.1. Function to calculate Accuracy: ((total characters typed - total errors) / total characters typed) * 100.
    *   3.2.4. **Elapsed Time Display (FR-009)**
        *   3.2.4.1. Format elapsed time as MM:SS.
    *   3.2.5. **Update Display**
        *   3.2.5.1. Function to update all metrics display elements upon test completion.
    *   3.2.6. **Live WPM/Accuracy Counter (FR-010 - Optional for MVP, but good to plan)**
        *   3.2.6.1. Implement a periodic update mechanism for live display during test.

## 4. Text Passage Management (MVP - Phase 4)

*   **4.1. Curated Text Passages (FR-011, FR-013)**
    *   4.1.1. Create a JavaScript array or object containing at least 10 diverse text passages.
    *   4.1.2. Ensure passages include alphanumeric, common punctuation, and basic symbols.
*   **4.2. Passage Selection Interface (FR-012)**
    *   4.2.1. HTML for a dropdown menu or a list of buttons for passage selection.
*   **4.3. JavaScript Selection Logic**
    *   4.3.1. Populate selection interface with available passages.
    *   4.3.2. Event listener for passage selection.
    *   4.3.3. Load selected passage into the typing area.

## 5. User Controls & Navigation (MVP - Phase 5)

*   **5.1. HTML Buttons**
    *   5.1.1. Create "Restart Test" button (FR-014).
    *   5.1.2. Create "New Passage" button (FR-015).
*   **5.2. JavaScript Button Functionality**
    *   5.2.1. Event listener for "Restart Test" button.
    *   5.2.2. Implement logic to reset current test (clear input, reset timer, re-display same passage).
    *   5.2.3. Event listener for "New Passage" button.
    *   5.2.4. Implement logic to load a new random passage and reset test.

## 6. Design & User Experience (UX - Ongoing throughout Phases 2-5, Refinement in Phase 6)

*   **6.1. Layout & Structure (3.1)**
    *   6.1.1. Implement Flexbox/CSS Grid for main layout (typing area, stats, controls).
    *   6.1.2. Ensure typing area is central and prominent.
    *   6.1.3. Position statistics panel clearly.
    *   6.1.4. Group controls logically.
*   **6.2. Visuals & Aesthetics (3.2, 3.5)**
    *   6.2.1. Apply clean, modern aesthetic.
    *   6.2.2. Implement specified color palette.
    *   6.2.3. Apply chosen typography (font family, size, line height, letter spacing).
    *   6.2.4. Ensure ample whitespace and consistent padding/margins.
    *   6.2.5. Implement responsive design using media queries.
    *   6.2.6. Add subtle animations for character highlighting and feedback.
*   **6.3. Interaction Design (3.3)**
    *   6.3.1. Ensure real-time visual feedback is instantaneous.
    *   6.3.2. Verify smooth typing experience (no lag).
    *   6.3.3. Implement clear button states (hover, focus, active).
*   **6.4. Accessibility Considerations (3.4)**
    *   6.4.1. Ensure all interactive elements are keyboard navigable.
    *   6.4.2. Add appropriate ARIA attributes.
    *   6.4.3. Verify color contrast ratios meet WCAG guidelines.
    *   6.4.4. Test browser-level text resizing.

## 7. Technical Requirements & Optimization (Ongoing throughout, Final Review in Phase 7)

*   **7.1. Code Structure (4.5)**
    *   7.1.1. Organize JavaScript into modular functions.
    *   7.1.2. Maintain clear separation of concerns (HTML, CSS, JS).
*   **7.2. Performance Optimization (4.4)**
    *   7.2.1. Review DOM manipulation for efficiency.
    *   7.2.2. Ensure minimal resource usage.
    *   7.2.3. Confirm no external libraries/frameworks are used for MVP.
*   **7.3. Data Persistence (4.3)**
    *   7.3.1. (Post-MVP consideration, but note for future) Plan for `localStorage` usage for future features.

## 8. Testing & Verification (Phase 8)

*   **8.1. Functional Testing**
    *   8.1.1. Verify all MVP features work as per PRD.
    *   8.1.2. Test typing engine accuracy and strict typing.
    *   8.1.3. Validate WPM, Accuracy, and Time calculations.
    *   8.1.4. Test passage selection and control buttons.
*   **8.2. Cross-Browser Compatibility Testing**
    *   8.2.1. Test on Google Chrome.
    *   8.2.2. Test on Mozilla Firefox.
    *   8.2.3. Test on Microsoft Edge.
    *   8.2.4. Test on Apple Safari.
*   **8.3. Responsive Design Testing**
    *   8.3.1. Test on various desktop screen sizes.
    *   8.3.2. Test on tablet orientations.
    *   8.3.3. Test on mobile orientations.
*   **8.4. Performance Testing**
    *   8.4.1. Measure page load time.
    *   8.4.2. Assess typing latency.
*   **8.5. Accessibility Audit**
    *   8.5.1. Conduct manual keyboard navigation test.
    *   8.5.2. Use accessibility tools to check ARIA and contrast.

## 9. Documentation (Phase 9)

*   **9.1. README.md Update**
    *   9.1.1. Add instructions for setting up and running the application.
    *   9.1.2. Briefly describe features.
*   **9.2. Code Comments**
    *   9.2.1. Add high-value comments for complex JavaScript logic.

---

## 10. Timed Test Mode (Phase 10)

*   **10.1. Mode Selection UI (FR-016)**
    *   10.1.1. HTML for mode selection (e.g., radio buttons for "Passage" and "Timed").
    *   10.1.2. CSS for styling mode selection.
    *   10.1.3. JavaScript to switch between test modes.
*   **10.2. Timer Options UI (FR-017)**
    *   10.2.1. HTML for timer duration selection (e.g., dropdown for 1min, 3min, 5min).
    *   10.2.2. CSS for styling timer options.
*   **10.3. JavaScript Core Logic for Timed Mode**
    *   10.3.1. **Implement Live Countdown (FR-018)**
        *   10.3.1.1. Display countdown timer element.
        *   10.3.1.2. Start countdown on first keystroke in Timed Mode.
        *   10.3.1.3. Update countdown display every second.
    *   10.3.2. **Modify Input Handling for Non-Strict Typing (FR-019)**
        *   10.3.2.1. Adjust `typingInput` event listener to allow progression on incorrect characters.
        *   10.3.2.2. Ensure backspace functions normally (deletes last typed character).
    *   10.3.3. **Test Conclusion for Timed Mode (FR-020)**
        *   10.3.3.1. Stop test when timer reaches zero.
        *   10.3.3.2. Disable `typingInput` when time expires.
        *   10.3.3.3. Trigger final metric calculation and display.
*   **10.4. JavaScript for Enhanced Timed Metrics (FR-021)**
    *   10.4.1. **Tracking Variables:**
        *   10.4.1.1. Introduce `totalCharactersTyped` variable.
        *   10.4.1.2. Introduce `skippedCharacters` variable.
    *   10.4.2. **Revised Calculation Functions:**
        *   10.4.2.1. Update `calculateWPM` for timed mode (based on time limit).
        *   10.4.2.2. Update `calculateNetWPM` for timed mode (based on time limit and new error counts).
        *   10.4.2.3. Update `calculateAccuracy` for timed mode (correct / total typed).
        *   10.4.2.4. Implement logic to count `correctCharacters`, `incorrectCharacters`, `skippedCharacters` in timed mode.
    *   10.4.3. **Display Enhanced Metrics:**
        *   10.4.3.1. Update `updateMetricsDisplay` to show new metrics.
        *   10.4.3.2. Add HTML elements for `correctCharacters`, `incorrectCharacters`, `skippedCharacters`, `totalCharactersTyped` to `index.html`.
        *   10.4.3.3. CSS for styling new metric display elements.
*   **10.5. Integration & Refinement**
    *   10.5.1. Ensure "Restart Test" and "New Passage" buttons work correctly in Timed Mode.
    *   10.5.2. Refine UI/UX for smooth mode switching and clear feedback.

## 11. Virtual Keyboard Visualization (Phase 11)

*   **11.1. HTML Structure for Virtual Keyboard (FR-022.1)**
    *   11.1.1. Add a container for the virtual keyboard in `index.html`.
    *   11.1.2. Create HTML elements for each key, organized by rows.
*   **11.2. CSS Styling for Virtual Keyboard (FR-022.2, FR-022.3)**
    *   11.2.1. Style the overall keyboard layout (e.g., grid/flexbox for rows and keys).
    *   11.2.2. Style individual keys (size, shape, text).
    *   11.2.3. Define CSS classes for key press/active states.
    *   11.2.4. Implement responsive design for the virtual keyboard.
*   **11.3. JavaScript Logic for Virtual Keyboard Interaction (FR-022.2)**
    *   11.3.1. Map physical keyboard `event.code` to virtual keyboard key elements.
    *   11.3.2. Add event listeners for `keydown` to highlight virtual keys.
    *   11.3.3. Add event listeners for `keyup` to reset virtual key highlights.
    *   11.3.4. Integrate virtual keyboard with existing test modes (ensure it doesn't interfere).
