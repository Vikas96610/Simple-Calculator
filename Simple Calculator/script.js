document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('button');

    let currentInput = '';
    let operator = null;
    let firstOperand = null;
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;

            if (button.classList.contains('bg-red-500')) { // AC button
                currentInput = '';
                operator = null;
                firstOperand = null;
                display.textContent = '0';
                return;
            }

            if (buttonText === 'Del') {
                if (currentInput.length > 0) {
                    currentInput = currentInput.slice(0, -1);
                    if (currentInput === '') {
                        display.textContent = '0';
                    } else {
                        display.textContent = currentInput;
                    }
                }
                return;
            }

            if (buttonText === '=') {
                if (operator && firstOperand !== null) {
                    currentInput = operate(firstOperand, operator, parseFloat(currentInput)).toString();
                    display.textContent = currentInput;
                    firstOperand = null;
                    operator = null;
                    shouldResetDisplay = true;
                }
                return;
            }

            if (['/', '*', '-', '+'].includes(buttonText)) {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput);
                } else if (operator) {
                    firstOperand = operate(firstOperand, operator, parseFloat(currentInput));
                    display.textContent = firstOperand;
                }
                operator = buttonText;
                shouldResetDisplay = true;
                return;
            }

            if (shouldResetDisplay) {
                currentInput = buttonText;
                shouldResetDisplay = false;
            } else {
                currentInput += buttonText;
            }
            display.textContent = currentInput;
        });
    });

    function operate(a, op, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b === 0) {
                    alert("Cannot divide by zero!");
                    return 0;
                }
                return a / b;
            default:
                return b;
        }
    }
});