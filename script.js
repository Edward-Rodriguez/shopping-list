/**
 * Simple shopping list.
 *
 * Add, delete, strike-through items on a list.done
 *
 * @link  https://edward-rodriguez.github.io/shopping-list/
 * @author Edward Rodriguez
 * @since 12/20/19
 * */

var div = document.querySelector('div');
var input = document.getElementById('userInput');
var button = document.getElementsByTagName('button')[0];
var ul = document.querySelector('ul');
var deleteButtons = document.querySelectorAll('input[name="delete"]');
var warning = document.getElementById('warningLabel');
var groceryList = [
  'Jello',
  'Spinach',
  'Rice',
  'Birthday Cake',
  'Candles',
  'Notebook'
];
const deleteImage = 'images/delete.png';
const deleteImageRed = 'images/delete_red.png';
const attributes = {
  type: 'image',
  name: 'delete',
  alt: 'Delete',
  src: deleteImage
};

function removeWhiteSpace(text) {
  //  regex for removing whitespace
  return text.replace(/\s+/g, '');
}

/*  check if input value is valid an non-empty
display warning if already on the list*/
function inputIsValid() {
  var inputVal = removeWhiteSpace(input.value);
  if (inputVal.length > 0)
    if (groceryList.indexOf(inputVal) === -1) {
      return true;
    } else {
      warning.className = 'warningLabelON';
    }
  else return false;
}

//  set attributes for input button
function setAttributes(element) {
  for (var key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//  create a list element under ul with a delete button and new item
//  add attributes/event listeners to new delete button
function createListElement(item) {
  var li = document.createElement('li');
  var deleteButton = document.createElement('input');
  deleteButton.addEventListener('click', deleteItem);
  deleteButton.addEventListener('mouseenter', toggleTrashImage);
  deleteButton.addEventListener('mouseleave', toggleTrashImage);
  setAttributes(deleteButton);
  li.appendChild(deleteButton);
  li.appendChild(document.createTextNode(item));
  ul.appendChild(li);
  groceryList.push(item);
  input.value = '';
  warning.className = 'warningLabelOFF';
}

//  create an element on button click and add to list and groceryList
function addListAfterClick() {
  if (inputIsValid()) {
    createListElement(removeWhiteSpace(input.value));
  }
}

//  create an element on enter key press and add to list and groceryList
function addListAfterKeyPress(event) {
  if (event.keyCode === 13 && inputIsValid()) {
    createListElement(removeWhiteSpace(input.value));
  }
}

//  toggle strike-through on item click
function toggleAfterClick(e) {
  e.target.classList.toggle('done');
}

// delete parent list element containing delete button
function deleteItem(e) {
  var targetParent = e.target.parentNode; // parent list element
  var itemToBeRemoved = targetParent.innerText;
  targetParent.parentNode.removeChild(targetParent);
  groceryList.splice(groceryList.indexOf(itemToBeRemoved), 1);
}

// change trash can image to red
function toggleTrashImage(e) {
  var element = e.target;
  if (element.getAttribute('src') === deleteImage)
    element.setAttribute('src', deleteImageRed);
  else element.setAttribute('src', deleteImage);
}

/*************************  EVENT LISTENERS **************************/
//  add mouse click event listener to add button
button.addEventListener('click', addListAfterClick);

//  add enter key event listener to input field
input.addEventListener('keypress', addListAfterKeyPress);

//  add mouse click listener to toggle line strike-through on item
ul.addEventListener('click', toggleAfterClick);

// add mouse click listener to each delete button
deleteButtons.forEach(button => {
  button.addEventListener('click', deleteItem);
  button.addEventListener('mouseenter', toggleTrashImage);
  button.addEventListener('mouseleave', toggleTrashImage);
});
/******************** END OF EVENT LISTENERS *************************/
