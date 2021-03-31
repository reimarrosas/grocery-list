"use strict";

/*
 * Globals
 */
const groceryList = [];
let id = 0;

/*
 * DOM Elements needed for the operations
 */
const form = document.querySelector(".header__input-grocery");
const formInput = document.getElementById("input-grocery");
const groceryItemsContainer = document.querySelector(".grocery-items");

/*
 * Form Event Handler
 */
form.addEventListener("submit", (e) => {
  const input = formInput.value;
  
  validateInput(input);

  generateGroceryList();

  const deleteButton = document.querySelectorAll(".btn-delete");
  deleteButton.forEach(btn => createEventListener(btn, "click", handleDeleteButton));
  const checkboxes = document.querySelectorAll("[type='checkbox']");
  checkboxes.forEach(checkbox => createEventListener(checkbox, "change", handleCompletenessCheckbox));
  const groceryItemsDiv = document.querySelectorAll(".grocery-item");
  groceryItemsDiv.forEach(itemDiv => createEventListener(itemDiv, "click", handleGroceryItemUpdate));
  
  formInput.value = "";
  e.preventDefault();
});

/*
 * Form Event Handler Helpers
 */
function validateInput(input) {
  if (isInputValid(input)) {
    groceryList.push({
      id: id++,
      item: input,
      complete: false
    })
  }
  else {
    alert("Invalid Input!");
  }
}

function isInputValid(input) {
  return /[^\s*]/g.test(input); //&& input.length <= 10;
}

function generateGroceryList() {
  groceryItemsContainer.innerHTML = "";
  groceryList.forEach(item => createGrocerySection(item));
}

function createEventListener(element, type, eventHandler) {
  if (element.dataset.hasEventListener === "false") {
    element.addEventListener(type, eventHandler);
    element.dataset.hasEventListener = true;
  }
}

/*
 * eventHandlers for Grocery operations
 */

function handleDeleteButton(e) {
  const itemDiv = e.target.parentElement;
  const itemIndex = groceryList.findIndex(item => item.id === Number(itemDiv.dataset.itemId));
  groceryList.splice(itemIndex, 1);
  groceryItemsContainer.removeChild(itemDiv);
  e.stopPropagation();
}

function handleCompletenessCheckbox(e) {
  const groceryName = e.target.nextElementSibling;
  groceryName.classList.toggle("complete");
  e.stopPropagation();
}

function handleGroceryItemUpdate(e) {
  const itemDiv = e.target;
  console.log(itemDiv);
}

/*
 * generateGroceryList Helpers
 */
function createGrocerySection(groceryItem) {
  const item = createBaseElement("div", "grocery-item", "");
  item.dataset.itemId = groceryItem.id;
  item.dataset.hasEventListener = false;

  const checkbox = createBaseElement("input", "grocery-complete", "");
  checkbox.type = "checkbox";
  checkbox.dataset.hasEventListener = false;

  const groceryName = createBaseElement("span", "grocery-name", groceryItem.item);

  const deleteButton = createBaseElement("button", "btn-delete", "Delete");
  deleteButton.dataset.hasEventListener = false;

  multiAppendChild(item, checkbox, groceryName, deleteButton);

  groceryItemsContainer.appendChild(item);
}

/*
 * createGrocerySection Helpers
 */
function createBaseElement(elementType, className, textContent) {
  const element = document.createElement(elementType);
  element.className = className;
  element.textContent = textContent;

  return element;
}

function multiAppendChild(parent, ...children) {
  children.forEach(child => parent.appendChild(child));
}