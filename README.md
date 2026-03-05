# Green Basket Grocery - Demo Store

* **Instructor**: Nadia Gouda
* **Author**: Robert Dion
* **Clientside Programming**: Assignment 9: Code Review

A lightweight, interactive grocery store web application designed to practice **HTML**, **CSS**, and **JavaScript** integration. This project features dynamic total calculation, a generated text-based receipt, and an automated inactivity timer.

## Project Overview
The **Green Basket Grocery** application serves as a training demo for clientside programming. It allows users to:
1.  Enter quantities for various grocery staples.
2.  Calculate the final total dynamically.
3.  Generate a formatted receipt with a timestamp.
4.  Monitor a 15-second inactivity window that resets the session automatically.

---

## System Architecture
The project follows a standard web architecture where HTML provides the structure, CSS handles the visual layer, and JavaScript manages the behavioral logic.

### How HTML and JavaScript Connect
The relationship between the files functions as a continuous data flow:
1.  **Selection**: JavaScript uses `document.getElementById()` to "hook" into specific HTML elements (like `milk`, `bread`, or `total`).
2.  **Input**: The user types a number into the HTML input field; JavaScript reads this value via the `.value` property.
3.  **Calculation**: JavaScript processes the input by multiplying it by hardcoded constants (e.g., `PRICE_MILK`).
4.  **Output**: JavaScript injects the calculated results back into the HTML by modifying `.textContent` for the total and receipt display areas.

---

## Summary of System Functions

| Function | Description |
| :--- | :--- |
| `startTimer()` | A background process that ensures security and data cleanliness by resetting the system after 15 seconds of inactivity. |
| `calculateTotal()` | Performs the core business logic—retrieving all input quantities and summing up the total cost. |
| `printReceipt()` | Generates a formatted text summary string, including a dynamic timestamp provided by `formatDateTime()`. |
| `resetCart()` | Returns the system state to zero, acting as a "flush" for all data inputs and displays. |
| `readQty(id)` | A helper function that sanitizes user input to prevent errors from blank fields or negative numbers. |

---

## Styling Logic
The application uses **CSS Root Variables** to maintain a standardized visual vocabulary.
* **Grid Layout**: Used for the shop items to organize the product units into a two-dimensional map, ensuring structural clarity.
* **Flexbox**: Used in the header and item rows to maintain alignment and distribute space efficiently.
* **Responsive Design**: A media query ensures the grid collapses into a single column on screens smaller than **700px**.

---

## Professional Improvement Suggestion
**Topic: Semantic HTML Implementation**

The current codebase relies heavily on generic `<div>` tags for layout. To align with professional standards and **SEO (Search Engine Optimization)**, the following changes are recommended:
* **Accessibility**: Replace generic containers with semantic tags like `<article>`, `<figure>`, and `<ul>`. This allows screen readers to navigate the "main" or "navigation" content more effectively.
* **Structure vs. Layout**: As noted in **UML Class Diagram** concepts, structural clarity is vital. Using `<label>` tags for inputs improves the user experience—clicking a product name now focuses the numeric box.
* **Output Semantics**: Change the total display from a `<span>` to an `<output>` tag to semantically indicate that the value is the result of a programmatic calculation.

---


