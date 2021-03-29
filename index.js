"use strict";

// Grocery List App
// 1. Get User input from the form
// 2. Parse/Validate the input
// 3. Store the input to the groceryList with a corresponding id and completeness.
// 4. Create the dom elements representing the grocery item
// 5. Add the grocery element to the dom
// 6. Implement the different additional methods, Update, Remove, Complete
  // a. Remove
    // i. Check the id of the grocery item
    // ii. Remove item in the grocery list
    // iii. Redraw the branch
  // b. Complete
    // i. If checkbox is clicked, set completeness to true
    // ii. If completeness, add completeness css class
  // c. Update
    // i. On item click, bring down menu for inputting new item
    // ii. On submit, get the new input
    // iii. Validate the input
    // iv. Set the selected item to the inputted value
    
const groceryList = [];