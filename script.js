let previousOperand = '';
let currentOperand = '';
let currentOperator = null;
let decimal = false;
let shouldClearScreen = false;

const operatorButtons = document.querySelectorAll(".operator-btn");
const clearButton = document.querySelector("#clear-btn");
const deleteButton = document.querySelector("#delete-btn");
const plusMinusButton = document.querySelector("#plusminus-btn")
const numberButtons = document.querySelectorAll(".nums");
const equalsButton = document.querySelector("#equals-btn")
const decimalButton = document.querySelector(".decimal");
const displayContent = document.querySelector(".display-content");

clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
decimalButton.addEventListener('click', appendDecimal);
plusMinusButton.addEventListener('click', switchSigns);
equalsButton.addEventListener('click', evaluate);

operatorButtons.forEach(button => { 
    button.addEventListener('click', () => setOperator(button.textContent))
});

numberButtons.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent))
});

function appendNumber(newNum) {
    if (displayContent.textContent == '0' || shouldClearScreen == true) {
        clearScreen();
    }
    displayContent.textContent += newNum;
}

function appendDecimal () {
    if (decimal == false) {
        displayContent.textContent += '.';
    }
    if(shouldClearScreen == true) {
        clearScreen();
        displayContent.textContent += '0.';
    }
    decimal = true;
}

function switchSigns() {
    displayContent.textContent = Number(displayContent.textContent) * -1;
}

function deleteNumber() {
    displayContent.textContent = displayContent.textContent.slice(0, -1);
    if (displayContent.textContent == '') {
        displayContent.textContent = '0';
    }
}

function clearScreen() {
    displayContent.textContent = '';
    shouldClearScreen = false;
}

function clear() {
    displayContent.textContent = '0';
    previousOperand = '';
    currentOperand = '';
    currentOperator = null;
    decimal = false;
    shouldClearScreen = false;
}

function setOperator(operator) {
    if (currentOperator !== null) {
        evaluate();
    }
    previousOperand = displayContent.textContent;
    currentOperator = operator;
    shouldClearScreen = true;
}

function evaluate() {
    if (currentOperator == null) {
        return;
    }
    if (currentOperator == '/' && displayContent.textContent == '0') {
        alert("Can't Divide by Zero!");
        clear();
    }
    else {
        currentOperand = displayContent.textContent;
        displayContent.textContent = operate(currentOperator, previousOperand, currentOperand);
        currentOperator = null;
    }
}

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    if (operator == '+') {
        return add(a, b)
    }
    else if (operator == '-') {
        return subtract(a, b)
    }
    else if (operator == 'x') {
        return multiply(a, b)
    }
    else if (operator == '/') {
        if (b !== 0) {
            return divide(a, b)
        }
        return null;
    }
}
