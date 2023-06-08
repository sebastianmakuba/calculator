
const displayPrevious = document.querySelector('[data-old-values]');
const displayCurrent = document.querySelector('[data-new-values]');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.querySelector('[data-clear]');
const equalButton = document.querySelector('[data-equal]');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;

// Function to update the display
function updateDisplay() {
    displayCurrent.innerText = currentOperand;
    displayPrevious.innerText = previousOperand;
}

// Function to append a number to the current operand
function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand += number;
}

// Function to choose an operation
function chooseOperation(selectedOperation) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = selectedOperation;
    previousOperand = currentOperand;
    currentOperand = '';
}

// Function to perform computation
function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case 'x':
            computation = prev * current;
            break;
        case '÷':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
}

// Function to clear the calculator
function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
}


numberButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        appendNumber(button.innerText);
        updateDisplay();
    });
});


operatorButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        chooseOperation(button.innerText);
        updateDisplay();
    });
});


equalButton.addEventListener('click', function() {
    compute();
    updateDisplay();
});


clearButton.addEventListener('click', function() {
    clear();
    updateDisplay();
});
