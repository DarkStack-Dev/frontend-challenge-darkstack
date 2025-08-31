let currentNumber = '0';
let previousNumber = null;
let operation = null;
let waitingForOperand = false;
let lastOperation = null;
let history = [];

const display = document.getElementById('display');
const historyElement = document.getElementById('history');

function updateDisplay() {

    if (currentNumber.length > 12) {
        if (currentNumber.includes('e')) {
            display.textContent = currentNumber;
        } else {
            const num = parseFloat(currentNumber);
            display.textContent = num.toExponential(6);
        }
    } else {
        display.textContent = currentNumber;
    }
}

function updateHistory() {
    if (history.length > 0) {
        historyElement.textContent = history[history.length - 1];
    } else {
        historyElement.textContent = '';
    }
}

function addNumber(num) {
    if (waitingForOperand) {
        currentNumber = num;
        waitingForOperand = false;
    } else {
        if (currentNumber === '0') {
            currentNumber = num;
        } else {
            currentNumber += num;
        }
    }
    updateDisplay();
}

function addDecimal() {
    if (waitingForOperand) {
        currentNumber = '0.';
        waitingForOperand = false;
    } else if (currentNumber.indexOf('.') === -1) {
        currentNumber += '.';
    }
    updateDisplay();
}

function clearCalculator() {
    currentNumber = '0';
    previousNumber = null;
    operation = null;
    waitingForOperand = false;
    lastOperation = null;
    
    document.querySelectorAll('.operator').forEach(btn => {
        btn.classList.remove('active');
    });
    
    display.classList.remove('error');
    
    updateDisplay();
}

function backspace() {
    if (!waitingForOperand) {
        if (currentNumber.length > 1) {
            currentNumber = currentNumber.slice(0, -1);
        } else {
            currentNumber = '0';
        }
        updateDisplay();
    }
}

function toggleSign() {
    if (currentNumber !== '0') {
        if (currentNumber.charAt(0) === '-') {
            currentNumber = currentNumber.slice(1);
        } else {
            currentNumber = '-' + currentNumber;
        }
        updateDisplay();
    }
}

function percentage() {
    const num = parseFloat(currentNumber);
    currentNumber = (num / 100).toString();
    updateDisplay();
}

function squareRoot() {
    const num = parseFloat(currentNumber);
    if (num < 0) {
        showError();
        return;
    }
    currentNumber = Math.sqrt(num).toString();
    updateDisplay();
}

function square() {
    const num = parseFloat(currentNumber);
    currentNumber = (num * num).toString();
    updateDisplay();
}

function setOperation(nextOperation) {
    const inputValue = parseFloat(currentNumber);
    
    document.querySelectorAll('.operator').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const operatorButtons = {
        '+': document.querySelector('[onclick="setOperation(\'+\')"]'),
        '-': document.querySelector('[onclick="setOperation(\'-\')"]'),
        '×': document.querySelector('[onclick="setOperation(\'×\')"]'),
        '÷': document.querySelector('[onclick="setOperation(\'÷\')"]')
    };
    
    if (operatorButtons[nextOperation]) {
        operatorButtons[nextOperation].classList.add('active');
    }
    
    if (previousNumber === null) {
        previousNumber = inputValue;
    } else if (operation) {
        const currentValue = previousNumber || 0;
        const newValue = performCalculation();
        
        if (newValue === null) return; 

        currentNumber = String(newValue);
        previousNumber = newValue;
        updateDisplay();
        
        const historyEntry = `${currentValue} ${operation} ${inputValue} = ${newValue}`;
        history.push(historyEntry);
        updateHistory();
    }
    
    waitingForOperand = true;
    operation = nextOperation;
}

function performCalculation() {
    const prev = previousNumber;
    const current = parseFloat(currentNumber);
    
    if (prev === null || operation === null) {
        return current;
    }
    
    let result;
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                showError();
                return null;
            }
            result = prev / current;
            break;
        default:
            return current;
    }
    
    return result;
}

function calculate() {
    const inputValue = parseFloat(currentNumber);
    
    if (previousNumber === null || operation === null) {
        lastOperation = {
            operation: operation,
            operand: inputValue
        };
        return;
    }
    
    const newValue = performCalculation();
    if (newValue === null) return; 
    
    const historyEntry = `${previousNumber} ${operation} ${inputValue} = ${newValue}`;
    history.push(historyEntry);
    updateHistory();
    
    lastOperation = {
        operation: operation,
        operand: inputValue
    };
    
    currentNumber = String(newValue);
    previousNumber = null;
    operation = null;
    waitingForOperand = true;
    
    document.querySelectorAll('.operator').forEach(btn => {
        btn.classList.remove('active');
    });
    
    updateDisplay();
}

function showError() {
    currentNumber = 'Error';
    display.classList.add('error');
    updateDisplay();
    
    setTimeout(() => {
        clearCalculator();
    }, 2000);
}

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }
}

function handleKeyboard(event) {
    const key = event.key;
    
    if (/[0-9+\-*/=.%]/.test(key) || key === 'Enter' || key === 'Escape' || key === 'Backspace') {
        event.preventDefault();
    }
    
    if (/[0-9]/.test(key)) {
        addNumber(key);
        return;
    }
    
    switch (key) {
        case '+':
            setOperation('+');
            break;
        case '-':
            setOperation('-');
            break;
        case '*':
            setOperation('×');
            break;
        case '/':
            setOperation('÷');
            break;
        case '=':
        case 'Enter':
            calculate();
            break;
        case '.':
            addDecimal();
            break;
        case '%':
            percentage();
            break;
        case 'Escape':
            clearCalculator();
            break;
        case 'Backspace':
            backspace();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    updateDisplay();
    
    document.addEventListener('keydown', handleKeyboard);
    
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});


document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});