"use strict";

// Grocery List App
// !1. Get User input from the form
// !2. Parse/Validate the input
// !3. Store the input to the groceryList with a corresponding id and completeness.
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

// To be added:
  // 1. Recovery of grocery items

const groceryList = [];
let id = 0;

const form = document.querySelector(".header__input-grocery");
const formInput = document.getElementById("input-grocery");

const groceryItems = document.querySelector(".grocery-items");

form.addEventListener("submit", handleGroceryInput);

function handleGroceryInput(evt) {
  const input = formInput.value;
  if (validateInput(input)) {
    groceryList.push({
      id: id++,
      item: input,
      complete: false
    })
  }
  else {
    alert("Invalid Input!");
  }
  
  formInput.value = "";
  evt.preventDefault();
}

function validateInput(input) {
  return /[^\s*]/g.test(input);
}

// function checkExistingItem(groceryItem, groceryItems) {
//   const renderedItems = [...groceryItems.children];
//   renderedItems.some(item => parseInt(item.dataset.itemId) === groceryItem.id)
// }

function generateGrocerySection(groceryItem) {
  const item = document.createElement("div");
  item.dataset.itemId = groceryItem.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const groceryName = document.createElement("span");
  groceryName.textContent = groceryItem.item;

  const deleteButton = document.createElement("button");
  deleteButton.className = "btn-delete";

  item.appendChild(checkbox);
  item.appendChild(groceryName);
  item.appendChild(deleteButton);

  groceryItems.appendChild(item);
}