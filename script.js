const button = document.querySelectorAll(".buttons");
const number = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".C-button");
const back = document.querySelector(".back");
const decimal = document.querySelector(".decimal");
let currentVal = document.querySelector(".currentValue");
let savedVal = document.querySelector(".savedValue");
const backIcon = document.querySelector(".back-icon");
const icons = document.querySelectorAll(".icon");
let operatorChosen;
window.addEventListener("keydown", keyBoard);

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

function clearSavedVal() {
	savedVal.innerText = "";
}

function clearCurrentVal() {
	currentVal.innerText = "";
}

function compute(op) {
	if (op == "divide" && currentVal.innerText == "0") {
		savedVal.innerText = "";
		currentVal.innerText = "Noob";
		disableAllButtons();
		return;
	}
	currentVal.innerText =
		Math.round(
			operate(
				op,
				Number(savedVal.innerText),
				Number(currentVal.innerText)
			) * 1000000000
		) / 1000000000;
	checkSize();
	clearSavedVal();
}

function userInput() {
	checkDecimal();
	number.forEach((numb) => {
		numb.onclick = function () {
			if (currentVal.innerText.length < 10) {
				currentVal.innerText += numb.innerText;
				disableOperators();
				enableOperators();
				checkDecimal();
			}
		};
	});

	operator.forEach((op) => {
		op.onclick = function () {
			if (savedVal.innerText != "" && currentVal.innerText != "") {
				compute(operatorChosen);
				if (currentVal.innerText != "Noob") {
					checkDecimal();
					operatorChosen = returnOperator(op);
					savedVal.innerText = currentVal.innerText;
					currentVal.innerText = "";
					checkDecimal();
				}
			} else {
				unlockInput();
				checkDecimal();
				operatorChosen = returnOperator(op);
				getSecondVal();
				checkDecimal();
				currentVal.innerText = currentVal.innerText;
			}
		};
	});
}

function getSecondVal() {
	savedVal.innerText = currentVal.innerText;
	currentVal.innerText = "";
}

function returnOperator(op) {
	if (op.classList.contains("divide")) {
		return "divide";
	}
	if (op.classList.contains("multiply")) {
		return "multiply";
	}
	if (op.classList.contains("subtract")) {
		return "subtract";
	}
	if (op.classList.contains("add")) {
		return "add";
	}
}

function equalButton() {
	equal.onclick = function () {
		if (savedVal.innerText != "" && currentVal.innerText != "") {
			compute(operatorChosen);
			lockInput();
		}
	};
}

function clearButtonClick() {
	clear.onclick = function () {
		savedVal.innerText = "";
		currentVal.innerText = "";
		decimal.style.opacity = "1";
		decimal.style.cursor = "pointer";
		decimal.disabled = false;
		unlockInput();
		enableAllButtons();
	};
}

function backSpaceButtonClick() {
	back.onclick = function () {
		currentVal.innerText = currentVal.innerText.slice(0, -1);
		checkDecimal();
	};
}

function checkSize() {
	if (currentVal.innerText.length > 10) {
		currentVal.innerText = Number(currentVal.innerText).toExponential(2);
	}
}

function checkDecimal() {
	if (
		currentVal.innerText.includes(".") ||
		currentVal.innerText.includes("Noob") ||
		savedVal.innerText.includes("Noob")
	) {
		decimal.style.opacity = "0.7";
		decimal.style.cursor = "not-allowed";
		decimal.disabled = true;
	} else {
		decimal.style.opacity = "1";
		decimal.style.cursor = "pointer";
		decimal.disabled = false;
	}
}

function lockInput() {
	number.forEach((numb) => {
		numb.style.opacity = "0.7";
		numb.style.cursor = "not-allowed";
		numb.disabled = true;
	});
	back.disabled = true;
	back.style.opacity = "0.7";
	back.style.cursor = "not-allowed";
	backIcon.style.opacity = "0.3";
}

function unlockInput() {
	number.forEach((numb) => {
		numb.style.opacity = "1";
		numb.style.cursor = "pointer";
		numb.disabled = false;
	});
	back.disabled = false;
	back.style.opacity = "1";
	back.style.cursor = "pointer";
	backIcon.style.opacity = "1";
}

function disableAllButtons() {
	button.forEach((btn) => {
		btn.disabled = true;
		btn.style.opacity = "0.7";
		btn.style.cursor = "not-allowed";
	});
	icons.forEach((icon) => {
		icon.style.opacity = "0.3";
	});
	clear.style.cursor = "pointer";
	clear.style.opacity = "1";
	clear.disabled = false;
}

function enableAllButtons() {
	button.forEach((btn) => {
		btn.disabled = false;
		btn.style.opacity = "1";
		btn.style.cursor = "pointer";
	});
	icons.forEach((icon) => {
		icon.style.opacity = "1";
	});
	clear.style.cursor = "pointer";
	clear.style.opacity = "1";
	clear.disabled = false;
}

function disableOperators() {
	operator.forEach((op) => {
		if (currentVal.innerText == ".") {
			op.disabled = true;
			op.style.opacity = "0.7";
			op.style.cursor = "not-allowed";
		}
	});
	icons.forEach((icon) => {
		icon.style.opacity = "0.3";
	});
}

function enableOperators() {
	operator.forEach((op) => {
		if (currentVal.innerText != ".") {
			op.disabled = false;
			op.style.opacity = "1";
			op.style.cursor = "pointer";
		}
	});
	icons.forEach((icon) => {
		icon.style.opacity = "1";
	});
}

function clearButtonCode() {
	savedVal.innerText = "";
	currentVal.innerText = "";
	decimal.style.opacity = "1";
	decimal.style.cursor = "pointer";
	decimal.disabled = false;
	unlockInput();
	enableAllButtons();
}

function backSpaceButtonCode() {
	currentVal.innerText = currentVal.innerText.slice(0, -1);
	checkDecimal();
}

function keyBoard(e) {
	if (currentVal.innerText.length < 10) {
		if (e.key >= 0 && e.key <= 9) currentVal.innerText += e.key;
		if (e.key === ".") {
			currentVal.innerText += e.key;
			checkDecimal();
		}
	}
	if (e.key === "=" || e.key === "Enter") {
		if (savedVal.innerText != "" && currentVal.innerText != "") {
			compute(operatorChosen);
			lockInput();
			return;
		}
	}
	if (e.key === "Backspace") backSpaceButtonCode();
	if (e.key === "c") clearButtonCode();
	if (e.key === "+") {
		if (savedVal.innerText != "" && currentVal.innerText != "") {
			compute(operatorChosen);
			if (currentVal.innerText != "Noob") {
				checkDecimal();
				operatorChosen = "add";
				savedVal.innerText = currentVal.innerText;
				currentVal.innerText = "";
				checkDecimal();
			}
		} else {
			unlockInput();
			checkDecimal();
			operatorChosen = "add";
			getSecondVal();
			checkDecimal();
			currentVal.innerText = currentVal.innerText;
		}
	}
	if (e.key === "-") {
		if (savedVal.innerText != "" && currentVal.innerText != "") {
			compute(operatorChosen);
			if (currentVal.innerText != "Noob") {
				checkDecimal();
				operatorChosen = "subtract";
				savedVal.innerText = currentVal.innerText;
				currentVal.innerText = "";
				checkDecimal();
			}
		} else {
			unlockInput();
			checkDecimal();
			operatorChosen = "subtract";
			getSecondVal();
			checkDecimal();
			currentVal.innerText = currentVal.innerText;
		}
	}
	if (e.key === "*") {
		if (savedVal.innerText != "" && currentVal.innerText != "") {
			compute(operatorChosen);
			if (currentVal.innerText != "Noob") {
				checkDecimal();
				operatorChosen = "multiply";
				savedVal.innerText = currentVal.innerText;
				currentVal.innerText = "";
				checkDecimal();
			}
		} else {
			unlockInput();
			checkDecimal();
			operatorChosen = "multiply";
			getSecondVal();
			checkDecimal();
			currentVal.innerText = currentVal.innerText;
		}
	}
	if (e.key === "/") {
		if (savedVal.innerText != "" && currentVal.innerText != "") {
			compute(operatorChosen);
			if (currentVal.innerText != "Noob") {
				checkDecimal();
				operatorChosen = "divide";
				savedVal.innerText = currentVal.innerText;
				currentVal.innerText = "";
				checkDecimal();
			}
		} else {
			unlockInput();
			checkDecimal();
			operatorChosen = "divide";
			getSecondVal();
			checkDecimal();
			currentVal.innerText = currentVal.innerText;
		}
	}
}

userInput();
equalButton();
clearButtonClick();
backSpaceButtonClick();
