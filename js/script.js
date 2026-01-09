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
    ["Styling web pages", "Adding interactivity to websites", "Creating databases", "Designing logos"],
    ["var", "let", "const", "All of the above"],
    ["<!-- -->", "//", "/* */", "#"],
    ["The data type of a variable", "The value of a variable", "The length of a variable", "The index of a variable"],
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
    ["Document Object Model", "Data Object Method", "Digital Ordinance Model", "Document Order Method"],
    ["for loop", "while loop", "do...while loop", "switch statement"],
    ["{}", "()", "[]", "<>"],
    ["parseInt()", "parseFloat()", "Number()", "String()"],
    ["break", "stop", "exit", "return"],
];

// Correct answers
let answers = [
    1, 3, 1, 0, 0, 3, 1, 2, 1, 2,
    1, 0, 1, 0, 1, 0, 0, 2, 0, 0,
];

let question = document.getElementById("question");
let answersPara = document.querySelectorAll(".answersPara");
let boxAnswers = document.querySelectorAll("input[name='ans']");

let qIndex = 0;
let qNum = 1;
let labels = ["A", "B", "C", "D"];

let userAnswers = [];
let selectedAnswer;

// Load question
function loadAnswers() {
    question.textContent = qNum + ". " + questions[qIndex];
    answersPara.forEach((para, i) => {
        para.textContent = labels[i] + ". " + options[qIndex][i];
    });
}

loadAnswers();

// Save answer
function saveAnswers() {
    selectedAnswer = undefined;

    boxAnswers.forEach((input, i) => {
        if (input.checked) {
            selectedAnswer = i;
        }
    });

    userAnswers[qIndex] = selectedAnswer;
    console.log(userAnswers);
}


// Restore previous answer
function preAnswers() {
    clearSelection();
    if (userAnswers[qIndex] !== undefined) {
        boxAnswers[userAnswers[qIndex]].checked = true;
    }
}

// Clear selection
function clearSelection() {
    boxAnswers.forEach((box) => {
        box.checked = false;
    });
}

// Alert system
let redAlertClose = document.querySelector(".btnRed");
let redAlertBox = document.querySelector(".red");

function noAnswerAlert() {
    if (!redAlertBox.classList.contains("show")) {
        redAlertBox.classList.add("show");
    }
}

redAlertClose.addEventListener("click", () => {
    redAlertBox.classList.remove("show");
});

// Hide alert when selecting an option
boxAnswers.forEach((input) => {
    input.addEventListener("change", () => {
        redAlertBox.classList.remove("show");
    });
});

// Next button
let btnNext = document.getElementById("next");
let btnPre = document.getElementById("back");

// Button Next
btnNext.addEventListener("click", () => {

    let hasSelected = false;

    boxAnswers.forEach((input) => {
        if (input.checked) {
            hasSelected = true;
        }
    });

    // VALIDATE CURRENT SELECTION
    if (!hasSelected) {
        noAnswerAlert();

    }
    // Allowing access to all questions
    hasSelected = false;


    if (qIndex < questions.length - 1) {
        saveAnswers();
        clearSelection();

        btnPre.disabled = false;
        qIndex++;
        qNum++;

        loadAnswers();
        preAnswers();

        // // Logging final score
        // const finalScore = calScore();
        // console.log("Final Score:", finalScore);

    } else {
        saveAnswers();
        btnNext.textContent = "Quiz Finished";
        window.location.href = "marks.html";
        // Logging final score
        const finalScore = calScore();
        console.log("Final Score:", finalScore);

        //Show Final Score in the Marks page
        const marks = document.getElementById("marks");
        marks.textContent = finalScore.toString();

    }
});

// Previous button
btnPre.addEventListener("click", () => {
    if (qIndex === 0) {
        btnPre.disabled = true;
        return;
    }

    qIndex--;
    qNum--;

    loadAnswers();
    preAnswers();
});

//Function to calculate score

function calScore() {
    let score = 0;
    for (let i = 0; i < answers.length; i++) {
        if (userAnswers[i] === answers[i]) {
            score += 5;
        }
    }
    return score;
}