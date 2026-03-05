/*******************************************************************************
 * ASSIGNMENT 9: CODE REVIEW
 * CLIENTSIDE PROGRAMMING
 * 
 * Instructor: Nadia Gouda
 * Author: Robert Dion
 * 
 * ===== PROFESSIONAL IMPROVEMENT SUGGESTION =====
 * The current code relies heavily on <div> tags for various parts of the page, such as the logo, product details, and the shopping cart card. While a <div> works for styling, it carries no meaning for the browser or assistive technologies. For example, the logo is just a div with text, and the product items are generic containers rather than meaningful list items.
 * 
 * Why Does This Matter?
 *  1. SEO (Search Engine Optimization): Search engines use semantic tags to identify the most important content on your page. Using a <div> for a brand logo or a main heading makes it harder for search engines to index the site properly.
 * 
 *  2. Accessibility: Screen readers use semantic tags to navigate. If everything is a div, a visually impaired user cannot easily jump to the "navigation" or "main" content.
 * 
 *  3. Maintainability: Following the systematic decomposition method, code should be broken into logical units. Semantic tags like <article>, <figure>, and <ul> make the code easier for other developers to read and understand at a glance.
 * 
 * ===== Key Changes I Would Make: =====
 * <figure> & <figcaption>: Use this for the logo and brand text to show they are a single unit of content.
 * 
 * <ul> and <li>: Use this for the product grid because it is a list of items. This tells the browser exactly how many items are in the shop.
 * 
 * <label>: Wrap the item info in a label and connected it to the id of the input. This is a major accessibility win—clicking the name "Milk" now focuses the number box.
 * 
 * <output>: Changedthe total display from a span to an output tag, which semantically indicates that the value is the result of a calculation.
 * 
 * *****************************************************************************
 */


// Global Variable stores the timer reference so it can be cleared/restarted.
let timer;

// Hardcoded Prices.
const PRICE_MILK = 3.50;
const PRICE_BREAD = 2.25;
const PRICE_EGGS = 4.10;
const PRICE_RICE = 6.00;
const PRICE_APPLES = 2.80;
const PRICE_CHICKEN = 9.50;

/**
 * startTimer function handles the 15 second inactivity logic.
 * EVery timer it runs it cancels the previous timer and starts a new 15 sec countdown. 
 */
function startTimer() {
  clearTimeout(timer);

  timer = setTimeout(function () {
    // if 15 seconds pass and this function isn't cleared the cart willl reset. 
    resetCart("Cart reset due to inactivity.");
  }, 15000); // this is the amount of time in milliseconds, 15000ms = 15 secs.
}

/**
 * This is a helper function, it safely reads numbers from HTML input  fields.
 * It prevents errors if a user leaves a field blank or types a negative number.
 */
function readQty(id) {
  /// Gets the value from the input and converts it to a number type. 
  let v = Number(document.getElementById(id).value);

  // Basic validation: defaults to 0 if input is negative or NaN.
  if (!document.getElementById(id).value) v = 0;
  if (isNaN(v) || v < 0) v = 0;

  // SyncS the sanitized value back to the HTML input field for visual consistency.
  document.getElementById(id).value = v;
  return v;
}

// Updates the 'Total' span in the HTML with a formatted dollar amount.
function setTotal(amount) {
  // toFixed(2) sets the number to 2 decimal places ($5.25 instead of $5 or $5.255555).
  document.getElementById("total").textContent = "$" + amount.toFixed(2);
}

/**
 * Logic for the 'Calculate Total' button
 * It  gathers all quantities, calculates the total and updates the UI. 
 */
function calculateTotal() {
  // Refresh the inactivity timer when tthe user interacted with the page. 
  startTimer();

  // This retrieves the quantities using the helper function (readQty()).
  let milk = readQty("milk");
  let bread = readQty("bread");
  let eggs = readQty("eggs");
  let rice = readQty("rice");
  let apples = readQty("apples");
  let chicken = readQty("chicken");

  // Sums up the quantity * PRICE for all  items. 
  let total =
    milk * PRICE_MILK +
    bread * PRICE_BREAD +
    eggs * PRICE_EGGS +
    rice * PRICE_RICE +
    apples * PRICE_APPLES +
    chicken * PRICE_CHICKEN;

  setTotal(total);

  // Provide Feedback in the receipt area.
  if (milk + bread + eggs + rice + apples + chicken === 0) {
    document.getElementById("receipt").textContent = "Cart is empty.";
  } else {
    document.getElementById("receipt").textContent = "Total calculated. Click Print Receipt.";
  }
}

// Function to turn a JS date object into a readable string.
function formatDateTime(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");

  let h = d.getHours();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12; // Converts to a 12-hour format
  if (h === 0) h = 12;

  const hh = String(h).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd} ${hh}:${min} ${ampm}`;
}

// Generates a text-based receipt and displays it in the <pre> tag.
function printReceipt() {
  startTimer();

  let milk = readQty("milk");
  let bread = readQty("bread");
  let eggs = readQty("eggs");
  let rice = readQty("rice");
  let apples = readQty("apples");
  let chicken = readQty("chicken");

  // Guard clause: if nothing is selcted, don't bother printing
  if (milk + bread + eggs + rice + apples + chicken === 0) {
    setTotal(0);
    document.getElementById("receipt").textContent = "Cart is empty.";
    return;
  }

  // Calculates individual line totals
  let milkLine = milk * PRICE_MILK;
  let breadLine = bread * PRICE_BREAD;
  let eggsLine = eggs * PRICE_EGGS;
  let riceLine = rice * PRICE_RICE;
  let applesLine = apples * PRICE_APPLES;
  let chickenLine = chicken * PRICE_CHICKEN;

  let total = milkLine + breadLine + eggsLine + riceLine + applesLine + chickenLine;
  setTotal(total);

  const now = new Date();
  const when = formatDateTime(now);

  // Builds the string for the receipt display.
  let text = "";
  text += "Green Basket Grocery\n";
  text += "Date/Time: " + when + "\n";
  text += "-----------------------------\n";

  // Only adds items to the receipt if the quantity is greater than 0.
  if (milk > 0) text += "Milk x" + milk + " = $" + milkLine.toFixed(2) + "\n";
  if (bread > 0) text += "Bread x" + bread + " = $" + breadLine.toFixed(2) + "\n";
  if (eggs > 0) text += "Eggs x" + eggs + " = $" + eggsLine.toFixed(2) + "\n";
  if (rice > 0) text += "Rice x" + rice + " = $" + riceLine.toFixed(2) + "\n";
  if (apples > 0) text += "Apples x" + apples + " = $" + applesLine.toFixed(2) + "\n";
  if (chicken > 0) text += "Chicken x" + chicken + " = $" + chickenLine.toFixed(2) + "\n";

  text += "-----------------------------\n";
  text += "FINAL TOTAL: $" + total.toFixed(2) + "\n";
  text += "Thank you for shopping!\n";

  // Injects the final string into the HTML
  document.getElementById("receipt").textContent = text;
}

/**
 * Function that resets all inputs and displays back to their original state
 * Takes a 'message' parameter to display diffeent text (ie; 'Cart reset' vs 'Inactivity reset').
 */
function resetCart(message) {
  document.getElementById("milk").value = 0;
  document.getElementById("bread").value = 0;
  document.getElementById("eggs").value = 0;
  document.getElementById("rice").value = 0;
  document.getElementById("apples").value = 0;
  document.getElementById("chicken").value = 0;

  setTotal(0);
  document.getElementById("receipt").textContent = message;

  // Restarts the  timer so the 'inactivity' message doesn't immediately repeat
  startTimer();
}

