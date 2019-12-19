// // DOM Selectors
// --------------
// getElementsByTagName()
// getElementsByClassName
// getElementById

// querySelector
// querySelectorAll

// getAttribute
// setAttribute

// ##Changing Styles
// style.{property} //ok

// className //best
// classList //best

// classList.add
// classList.remove
// classList.toggle

// ##Bonus
// innerHTML //DANGEROUS

// parentElement
// children

// ##It is important to CACHE selectors in variables

var div = document.querySelector('div');
var input = document.getElementById('userInput');
var button = document.getElementsByTagName('button')[0];
var ul = document.querySelector('ul');
var warning = document.getElementById('warningLabel');
var groceryList = [
  'Jello',
  'SPinach',
  'Rice',
  'Birthday Cake',
  'Candles',
  'Notebook'
];

//Changing class names of an element example
div.classList.add('hit-the-floor');

//output 'click' on button click
button.addEventListener('click', function() {
  console.log('click');
});

//output 'enter' on mouse entering button
button.addEventListener('mouseenter', function() {
  console.log('enter');
});

function removeWhiteSpace(text) {
  //regex for removing whitespace
  return text.replace(/\s+/g, '');
}

//check if input value is valid an non-empty
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

//create list element
function createListElement(item) {
  var li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  ul.appendChild(li);
  groceryList.push(item);
  input.value = '';
  warning.className = 'warningLabelOFF';
}

function addListAfterClick() {
  if (inputIsValid()) {
    createListElement(removeWhiteSpace(input.value));
  }
}

function addListAfterKeyPress(event) {
  var inputVal = input.value.replace(/\s+/g, '');
  if (event.keyCode === 13 && inputIsValid()) {
    createListElement(removeWhiteSpace(input.value));
  }
}

//create an element on button click and add to list and groceryList
button.addEventListener('click', addListAfterClick);

//create an element on enter key press and add to list and groceryList
input.addEventListener('keypress', addListAfterKeyPress);