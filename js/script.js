// Buttons exists in only on some pages

document.addEventListener("DOMContentLoaded", () => {
	const btnStart = document.getElementById("btnStart");
	if (btnStart) {
		btnStart.addEventListener("click", () => {
			window.location.href = "quizes.html";
		});
	}

	const btnExit = document.getElementById("exit");
	if (btnExit) {
		btnExit.addEventListener("click", () => {
			window.location.href = "index.html";
		});
	}
});

// Questions array

let questions = [
	"What is JavaScript mainly used for?",
	"Which keyword is used to declare a variable in JavaScript?",
	"Which symbol is used for single-line comments in JavaScript?",
	"What does the typeof operator return?",
	"Which method is used to add an element to the end of an array?",
	"Which data type is NOT primitive in JavaScript?",
	"How do you write an if statement in JavaScript?",
	"Which operator is used to compare both value and type?",
	"What will typeof [] return?",
	"Which event occurs when a button is clicked?",
	"Which method removes the last element from an array?",
	"How do you access the first element of an array?",
	"Which function is used to print output in the browser console?",
	"Which keyword is used to define a function?",
	"Which HTML element is commonly used to link JavaScript?",
	"What does DOM stand for?",
	"Which loop is best for iterating through an array?",
	"What is the correct way to write an array in JavaScript?",
	"Which method converts a string to an integer?",
	"Which keyword is used to stop a loop?",
];

// options array

let options = [
	[
		"Styling web pages",
		"Adding interactivity to websites",
		"Creating databases",
		"Designing logos",
	],
	["var", "let", "const", "All of the above"],
	["<!-- -->", "//", "/* */", "#"],
	[
		"The data type of a variable",
		"The value of a variable",
		"The length of a variable",
		"The index of a variable",
	],
	["push()", "pop()", "shift()", "unshift()"],
	["String", "Number", "Boolean", "Object"],
	["if i == 5", "if (i == 5)", "if i = 5", "if (i = 5)"],
	["==", "!=", "===", "<="],
	["array", "object", "list", "undefined"],
	["onchange", "onmouseover", "onclick", "onload"],
	["push()", "pop()", "shift()", "slice()"],
	["array[0]", "array(0)", "array.first()", "array.get(0)"],
	["print()", "console.log()", "alert()", "document.write()"],
	["function", "def", "method", "func"],
	["<js>", "<script>", "<javascript>", "<code>"],
	[
		"Document Object Model",
		"Data Object Method",
		"Digital Ordinance Model",
		"Document Order Method",
	],
	["for loop", "while loop", "do...while loop", "switch statement"],
	["{}", "()", "[]", "<>"],
	["parseInt()", "parseFloat()", "Number()", "String()"],
	["break", "stop", "exit", "return"],
];

// Answers array

let answers = [
	1, // Adding interactivity to websites
	3, // All of the above
	1, // //
	0, // The data type of variable
	0, // push()
	3, // Object
	1, // if (i == 5)
	2, // ===
	1, // object
	2, // onclick
	1, // pop()
	0, // array[0]
	1, // console.log()
	0, // function
	1, // <script>
	0, // Document Object Model
	0, // for loop
	2, // []
	0, // parseInt()
	0, // break
];

let question = document.getElementById("question");
let answersPara = document.querySelectorAll(".answersPara");
let qIndex = 0;
let opIndex = 0;
let labels = ["A", "B", "C", "D"];
let qNum = 1;

function loadAnswers() {
	console.log(question);

	question.textContent = qNum + ". " + questions[qIndex];

	answersPara.forEach((answersPara, i) => {
		answersPara.innerText = labels[i] + ". " + options[qIndex][i];
	});
}
loadAnswers();

// question.textContent = qNum + ". " + questions[0];
// answer.textContent = options[0];

let btnNext = document.getElementById("next");

btnNext.addEventListener("click", function () {
	// // Validate current question
	// if (userAnswers[qIndex] === undefined) {
	// 	noAnswerAlert();
	// 	return;
	// }

	// // Validate Current Question
	// if (userAnswers[opIndex] == undefined) {
	// 	noAnswerAlert();
	// 	return;
	// }

	// Getting the last element of the array and set check wether the quiz was finished
	if (qIndex < questions.length - 1) {
		saveAnswers();
		clearSelection();

		btnPre.disabled = false;
		qIndex++;
		qNum++;
		opIndex++;

		question.textContent = qNum + ". " + questions[qIndex];

		answersPara.forEach((answersPara, i) => {
			answersPara.textContent = labels[i] + ". " + options[qIndex][i];
		});
	} else {
		btnNext.textContent = "Quiz Finished";
	}
});

// function to save answers
let boxAnswers = document.querySelectorAll("input[name='ans']");
let userAnswers = [];
let selectedAnswer = -1;

function saveAnswers() {
	boxAnswers.forEach((input, i) => {
		if (input.checked) {
			selectedAnswer = i;
		}
	});

	userAnswers[opIndex] = selectedAnswer;
	console.log(userAnswers);

	if (selectedAnswer[opIndex] !== undefined) {
		boxAnswers[selectedAnswer[opIndex]].checked = false;
	}
}
// Function to clear previous answers

function clearSelection() {
				if (!boxAnswers || boxAnswers.length === 0) return;

				boxAnswers.forEach((box) => {
					box.checked = false;
				});
			}

// Button Previous Functionality

let btnPre = document.getElementById("back");

btnPre.addEventListener("click", function () {
	if (qIndex === 0) {
		btnPre.disabled = true;
	} else {
		qIndex--;
		qNum--;
		opIndex--;
		question.textContent = qNum + ". " + questions[qIndex];

		answersPara.forEach((answersPara, i) => {
			answersPara.textContent = labels[i] + ". " + options[qIndex][i];
		});
	}
});

// Alert system (functions)

// When user selecetd no answer
let redAlertClose = document.querySelector(".btnRed");
let redAlertBox = document.querySelector(".red");

// Function  to call when no answer is selected
function noAnswer() {}

function noAnswerAlert() {
	redAlertBox.classList.add("show");
}