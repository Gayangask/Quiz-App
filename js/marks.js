document.addEventListener("DOMContentLoaded", function () {
    const score = localStorage.getItem("finalScore");
    const marks = document.getElementById("marks");

    marks.innerText = ": " + score + " %";

});