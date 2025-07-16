# Product Requirements Document (PRD): Typing Master / Speed Tester

**Author:** Gemini

**Date:** 2025-07-16

**Version:** 1.3

---

## 1. Introduction & Vision

**1.1. Vision:** To create an accessible, engaging, and highly effective web-based tool that empowers users to significantly enhance their typing speed and accuracy through interactive, real-time practice, providing clear feedback and a path for continuous improvement.

**1.2. Problem Statement:** In an increasingly digital world, efficient typing is a fundamental skill for productivity. Many individuals, from students to seasoned professionals, struggle with suboptimal typing habits, leading to reduced efficiency and potential frustration. Existing typing tutors often suffer from poor user experience, lack of real-time feedback, or require cumbersome installations. There is a clear demand for a streamlined, web-native solution that prioritizes user engagement and measurable skill development.

**1.3. Target Audience:**
*   **Beginners:** Individuals new to typing or those with very low WPM seeking foundational practice.
*   **Intermediate Typists:** Users who can type but wish to improve their speed and accuracy for professional or personal reasons.
*   **Professionals & Students:** Anyone whose daily tasks involve significant computer usage and who can benefit from increased typing efficiency.
*   **Casual Users:** Individuals seeking a quick, free, and no-installation required typing practice tool.

**1.4. Core Goal:** Deliver a clean, intuitive, and highly responsive typing test experience that precisely measures WPM (Words Per Minute) and accuracy, provides immediate visual and contextual error feedback, and offers a diverse range of text passages to facilitate continuous learning and skill refinement.

---

## 2. Features & Functionality

### 2.1. MVP (Minimum Viable Product) - Version 1.0

**2.1.1. Core Typing Test Engine**
*   **FR-001:** The application shall display a pre-defined text passage within a dedicated typing area for the user to transcribe.
*   **FR-002:** As the user types, the application shall provide real-time visual feedback on each character:
    *   **Correct Input:** Characters typed correctly shall be highlighted in a distinct color (e.g., green).
    *   **Incorrect Input:** Characters typed incorrectly shall be highlighted in a different distinct color (e.g., red).
    *   **Current Character:** The next character to be typed shall be clearly indicated (e.g., with an underline, background highlight, or a distinct border).
*   **FR-003:** The application shall enforce strict typing: the user must correct any mistyped character before proceeding to the next character. This prevents "skipping" errors.
*   **FR-004:** The test shall automatically commence upon the first keystroke within the typing area and conclude precisely when the entire displayed passage has been correctly transcribed.
*   **FR-005:** The application shall accurately track the time elapsed from the first keystroke to the completion of the passage.

**2.1.2. Performance Metrics Display**
*   **FR-006:** Upon test completion, the application shall prominently display the user's Gross WPM (Words Per Minute), calculated as (total characters typed / 5) / (time in minutes).
*   **FR-007:** Upon test completion, the application shall prominently display the user's Net WPM, calculated as Gross WPM - (number of errors / time in minutes).
*   **FR-008:** Upon test completion, the application shall prominently display the user's typing accuracy as a percentage, calculated as ((total characters typed - total errors) / total characters typed) * 100.
*   **FR-009:** The total elapsed time for the test shall be displayed in a clear format (e.g., MM:SS).


**2.1.3. Text Passage Management**
*   **FR-011:** The application shall include a curated selection of at least 10 diverse, pre-defined text passages. These passages should vary in length (e.g., short sentences, medium paragraphs, longer articles) and complexity (e.g., common words, mixed case, punctuation).
*   **FR-012:** Users shall be able to easily select a different text passage from a clear, intuitive interface (e.g., a dropdown or a list of buttons).
*   **FR-013:** The application shall support passages containing standard alphanumeric characters, common punctuation (.,!?;:'"-), and basic symbols (@#$%^&*).

**2.1.4. User Controls & Navigation**
*   **FR-014:** A clearly visible "Restart Test" button shall be available at all times to allow the user to reset the current test and begin anew with the same passage.
*   **FR-015:** A "New Passage" button (or similar control) shall be available to load a different random passage from the available selection.

### 2.2. Post-MVP (Future Versions)

*   **Feature: Custom Text Input:** Allow users to paste their own text into a text area to use as a typing passage, with a character limit.
*   **Feature: Difficulty Levels/Categories:** Categorize passages by difficulty (e.g., "Beginner," "Intermediate," "Advanced") or by content type (e.g., "Programming Snippets," "Literary Quotes").
*   **Feature: Progress Tracking & History:**
    *   Save user's best scores (Net WPM, Accuracy) locally using `localStorage`.
    *   Display a simple historical chart or list of past test results.
*   **Feature: Sound Feedback:** Optional, subtle sound effects for correct and incorrect key presses.
*   **Feature: Error Analysis:** Provide a summary of common errors (e.g., frequently mistyped characters, common transpositions).
*   **Feature: User Accounts (via `localStorage`):** Allow multiple users on the same browser to save their progress separately.
*   **Feature: Virtual Keyboard Visualization:** The application shall display a dynamic, interactive virtual keyboard that visually highlights keys as they are pressed by the user, aiding in finger placement and visual learning.
    *   The virtual keyboard shall accurately reflect the layout of a standard QWERTY keyboard.
    *   Keys on the virtual keyboard shall visually change state (e.g., background color, border) when their corresponding physical key is pressed down and released.
    *   The virtual keyboard shall be responsive and adapt to different screen sizes.
    *   The virtual keyboard shall be optional and can be toggled on/off by the user (future enhancement, not for initial implementation).
*   **Feature: Test Completion Pop-up:** Upon test completion, a celebratory pop-up modal shall be displayed, summarizing the user's performance.
    *   The pop-up shall prominently display WPM, Accuracy, Time, Correct Characters, Incorrect Characters, and Total Typed Characters.
    *   The pop-up shall include a "Continue Same Passage" button to restart the current passage.
    *   The pop-up shall include a "Start Next Passage" button to load a new random passage.


---

## 3. Design & User Experience (UX)

**3.1. Layout & Structure:**
*   **Central Focus:** The typing area will be the most prominent element, occupying the majority of the screen real estate.
*   **Statistics Panel:** A dedicated, always-visible panel (e.g., at the top or side) for displaying WPM, Accuracy, and Time.
*   **Controls Area:** Buttons and passage selection controls will be logically grouped, easily accessible, and visually distinct (e.g., below the typing area).
*   **Minimalist Design:** Avoid clutter. Every element on the page should serve a clear purpose related to the typing test.

**3.2. Visuals & Aesthetics:**
*   **Clean & Modern:** Employ a contemporary, flat, or material design aesthetic.
*   **Readability First:** Prioritize clear typography and sufficient contrast.
*   **Responsive Design:** The layout must fluidly adapt to various screen sizes and orientations (desktop, laptop, tablet, mobile) without compromising usability or readability. Flexbox and CSS Grid will be primary tools for layout.
*   **Subtle Animations:** Use minimal, smooth transitions for feedback (e.g., character highlighting) to enhance user experience without being distracting.

**3.3. Interaction Design:**
*   **Real-time Feedback:** Instantaneous visual cues for correct/incorrect characters are paramount for effective learning.
*   **Intuitive Flow:** The user should be able to start a test, practice, and restart effortlessly without needing explicit instructions.
*   **Smooth Typing Experience:** Absolutely no perceptible lag between key press and character display/highlighting. The application must feel highly responsive.
*   **Error Handling:** Clear, non-intrusive feedback for any unexpected behavior (e.g., if a passage fails to load, though unlikely for local files).

**3.4. Accessibility Considerations:**
*   **Keyboard Navigation:** Ensure all interactive elements are navigable via keyboard.
*   **ARIA Attributes:** Use appropriate ARIA roles and attributes for screen reader compatibility.
*   **Color Contrast:** Adhere to WCAG guidelines for color contrast ratios to ensure readability for users with visual impairments.
*   **Font Sizing:** Allow for browser-level text resizing without breaking the layout.

**3.5. Style Guidelines:**

*   **Color Palette:**
    *   **Background:** Soft, light neutrals (e.g., `#f8f9fa`).
    *   **Primary Text:** Dark, readable neutrals (e.g., `#212529`).
    *   **Correct Character Highlight:** A subtle, calming green (e.g., background: `#E0F0E0`, text: `#6B8E23`).
    *   **Incorrect Character Highlight:** A clear, but not alarming, red (e.g., background: `#F5E0E0`, text: `#A52A2A`).
    *   **Current Character Indicator:** A light, distinct blue or subtle grey (e.g., background: `#E6E6FA`, or a simple `border-bottom: 2px solid #9370DB`).
    *   **Accent Colors:** A single, consistent accent color (e.g., a medium blue like `#9370DB`) for buttons, progress indicators, and key metrics.
*   **Typography:**
    *   **Font Family:** A highly readable, modern sans-serif font. Recommendations: `'Inter'`, or a system font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`).
    *   **Font Size:**
        *   Typing Area Text: `1.5rem` for optimal readability.
        *   Statistics: `1.1rem`, bolded for emphasis.
        *   Controls: `0.9rem`.
    *   **Line Height:** `1.6` for comfortable reading of text passages.
    *   **Letter Spacing:** Normal or slightly tighter for improved word recognition.
*   **Spacing:**
    *   **Whitespace:** Ample whitespace around all elements to reduce cognitive load and improve visual hierarchy.
    *   **Padding/Margins:** Consistent `padding` and `margin` values (e.g., multiples of 4px, 8px, 16px, 24px, 32px) to create a harmonious layout.
*   **Buttons & Controls:**
    *   **Appearance:** Clean, slightly rounded corners, clear text labels.
    *   **States:** Distinct `hover`, `focus`, and `active` states for all interactive elements.
    *   **Icons:** Use simple, clear icons where appropriate (e.g., a refresh icon for restart).

---

## 4. Technical Requirements

**4.1. Platform:** Standard Web Browsers (Google Chrome, Mozilla Firefox, Microsoft Edge, Apple Safari).

**4.2. Core Technologies:**
*   **HTML5:** For semantic document structure.
*   **CSS3:** For all styling, layout (Flexbox and/or CSS Grid for responsive design), and visual feedback.
*   **JavaScript (ES6+):** The primary language for all application logic, including:
    *   DOM manipulation for rendering text and feedback.
    *   Event handling for keyboard input.
    *   Timer management for WPM calculation.
    *   String manipulation for text comparison and error detection.
    *   Data storage and retrieval using `localStorage`.

**4.3. Data Persistence:**
*   `localStorage`: Will be used for storing the currently selected text passage and potentially future user preferences or basic progress tracking (Post-MVP).

**4.4. Performance & Optimization:**
*   **High Responsiveness:** The application must process keyboard events and update the UI with virtually no latency. This is critical for a good typing experience.
*   **Efficient DOM Updates:** Minimize direct DOM manipulation. Consider using techniques like document fragments or virtual DOM concepts (if a lightweight library is introduced in future, though not for MVP) to batch updates.
*   **Minimal Resource Usage:** The application should be lightweight, load quickly, and consume minimal CPU/memory resources.
*   **No External Libraries/Frameworks (MVP):** The MVP will be built using vanilla HTML, CSS, and JavaScript to ensure maximum performance, minimal footprint, and full control over the codebase. This also avoids unnecessary dependencies.

**4.5. Code Structure:**
*   Modular JavaScript: Organize code into logical functions and potentially modules (using ES6 `import`/`export` if served locally or via a simple build step) for maintainability.
*   Clear Separation of Concerns: HTML for structure, CSS for presentation, JavaScript for behavior.

---

## 5. Success Metrics

*   **User Engagement:**
    *   Average session duration.
    *   Number of tests completed per user.
    *   Repeat user rate (e.g., daily/weekly active users).
*   **Performance:**
    *   Perceived responsiveness of typing feedback (minimal lag).
    *   Fast initial page load time.
*   **User Satisfaction:**
    *   Qualitative feedback (if collected).
    *   Positive sentiment in any user reviews (if published).
*   **Accuracy of Metrics:** WPM and accuracy calculations are consistently correct and reliable.
*   **Accessibility:** Conformance to WCAG 2.1 AA standards for web accessibility.

---
