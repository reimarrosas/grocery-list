"use strict";

// Grocery List App
// !1. Get User input from the form
// !2. Parse/Validate the input
// !3. Store the input to the groceryList with a corresponding id and completeness.
// !4. Create the dom elements representing the grocery item
// !5. Add the grocery element to the dom
// 6. Implement the different additional methods, Update, Remove, Complete
  // !a. Remove
    // i. Check the id of the grocery item
    // ii. Remove item in the grocery list
    // iii. Redraw the branch
  // !b. Complete
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

  generateGroceryList();

  const deleteButton = document.querySelectorAll(".btn-delete");
  deleteButton.forEach(btn => createEventListener(btn, "click", handleItemDelete));
  const checkboxes = document.querySelectorAll("[type='checkbox']");
  checkboxes.forEach(checkbox => createEventListener(checkbox, "change", handleItemComplete));
  
  formInput.value = "";
  evt.preventDefault();
}

function validateInput(input) {
  return /[^\s*]/g.test(input) //&& input.length <= 10;
}
function generateGroceryList() {
  groceryItems.innerHTML = "";
  groceryList.forEach(item => createGrocerySection(item));
}

function createGrocerySection(groceryItem) {
  const item = createBaseElement("div", "grocery-item", "");
  item.dataset.itemId = groceryItem.id;

  const checkbox = createBaseElement("input", "grocery-complete", "");
  checkbox.type = "checkbox";
  checkbox.dataset.hasEventListener = false;

  const groceryName = createBaseElement("span", "grocery-name", groceryItem.item);

  const deleteButton = createBaseElement("button", "btn-delete", "Delete");
  deleteButton.dataset.hasEventListener = false;

  multiAppendChild(item, checkbox, groceryName, deleteButton);

  groceryItems.appendChild(item);
}

function createBaseElement(elementType, className, textContent) {
  const element = document.createElement(elementType);
  element.className = className;
  element.textContent = textContent;

  return element;
}

function multiAppendChild(parent, ...children) {
  children.forEach(child => parent.appendChild(child));
}

function createEventListener(element, type, eventHandler) {
  if (element.dataset.hasEventListener === "false") {
    element.addEventListener(type, eventHandler);
    element.dataset.hasEventListener = true;
  }
}


function handleItemDelete(e) {
  const itemDiv = e.target.parentElement;
  groceryItems.removeChild(itemDiv);
}

function handleItemComplete(e) {
  const groceryName = e.target.nextElementSibling;
  groceryName.classList.toggle("complete");
}