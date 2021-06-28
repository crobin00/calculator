function add(num1, num2) {
	return num1 + num2;
}

function subtract(num1, num2) {
	return num1 - num2;
}

function multiply(num1, num2) {
	return num1 * num2;
}

function divide(num1, num2) {
	return num1 / num2;
}

function operate(operator, num1, num2) {
	switch (operator) {
		case "add":
			return add(num1, num2);
			break;
		case "subtract":
			return subtract(num1, num2);
			break;
		case "multiply":
			return multiply(num1, num2);
			break;
		case "divide":
			return divide(num1, num2);
			break;
	}
}

function buttonPress() {
	const calculatorButton = document.querySelectorAll(".buttons");
	let span = document.querySelector("span");
	let firstValue;
	let value = [];
	let operator;
	let sum = null;
	calculatorButton.forEach((button) => {
		button.addEventListener("click", (e) => {
			if (e.target.classList.contains("number")) {
				console.log("numba");
				span.innerText += e.target.innerText;
			}
			if (e.target.classList.contains("operator")) {
				console.log("smooth operata");
			} else if (e.target.classList.contains("multiply")) {
				operator = "multiply";
			} else if (e.target.classList.contains("subtract")) {
				operator = "subtract;";
			} else if (e.target.classList.contains("add")) {
				operator = "add";
			}
			if (e.target.classList.contains("equal")) {
			}
			if (e.target.classList.contains("C-button")) {
				console.log("we gon clear");
			}
			if (e.target.classList.contains("back")) {
				console.log("back that thang up");
			}
		});
	});
}

function pressedNumber() {
	const numberButton = document.querySelectorAll(".number");
	let span = document.querySelector("span");
	let screenValue = [];
	numberButton.forEach((number) => {
		number.addEventListener("click", (e) => {
			console.log(e.target.outerText);
			screenValue.push(e.target.outerText);
			span.innerText =
				span.innerText + screenValue[screenValue.length - 1];
			console.log(screenValue);
		});
	});
}

function pressedOperator() {
	const operator = document.querySelectorAll(".operator");
	let span = document.querySelector("span");
	operator.forEach((operation) => {
		operator.addEventListener("click", (e) => {});
	});
}

buttonPress();
