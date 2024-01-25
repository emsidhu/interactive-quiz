let questions = [
    {
        query: "What is 1+1?",
        options: [
            "0",
            "1",
            "2",
            "3"
        ],
        answer: 2,
        choice: -1
    },
    {
        query: "What is the title of this website?",
        options: [
            "Interactive Test",
            "Science Test",
            "Interactive Quiz",
            "Math Quiz"
        ],
        answer: 2,
        choice: -1
    },
    {
        query: "What is the capital of Canada?",
        options: [
            "Ottawa",
            "Canada City",
            "Toronto",
            "Vancouver"
        ],
        answer: 0,
        choice: -1
    },
    {
        query: "What is 5*5-10*2?",
        options: [
            "-50",
            "30",
            "10",
            "5"
        ],
        answer: 3,
        choice: -1
    },
    {
        query: "What is 2+7?",
        options: [
            "5",
            "7",
            "9",
            "2"
        ],
        answer: 2,
        choice: -1
    },
    {
        query: "What is 23+12?",
        options: [
            "37",
            "45",
            "34",
            "35"
        ],
        answer: 3,
        choice: -1
    },
    {
        query: "What is 5*12?",
        options: [
            "55",
            "65",
            "60",
            "61"
        ],
        answer: 2,
        choice: -1
    },
    {
        query: "What is 19*20/4?",
        options: [
            "76",
            "95",
            "75",
            "94"
        ],
        answer: 1,
        choice: -1
    },
    {
        query: "What is 4+25-5+2*3?",
        options: [
            "30",
            "29",
            "28",
            "31"
        ],
        answer: 0,
        choice: -1
    },
    {
        query: "What is 19*20/5?",
        options: [
            "76",
            "95",
            "75",
            "94"
        ],
        answer: 0,
        choice: -1
    }
]
let curQuestion = 0;
let resultsShown = false;
const NUMQUESTIONS = questions.length;

// Get DOM elements
// Form
let form = document.querySelector("form");
let legend = document.querySelector("legend");
let queryP = document.getElementById("query");
let optionDivs = document.getElementById("answers").children;
let radios = document.querySelectorAll("input[type='radio']");
let labels = document.querySelectorAll("label");
let prevBtn = document.getElementById("previous");
let nextBtn = document.getElementById("next");
let submitBtn = document.querySelector("input[type='submit']");
// Results
let resultDiv = document.getElementById("results");
let scoreP = document.getElementById("score");
let answerTable = document.querySelector("table");
let answerKey = document.getElementById("answer-key");
let toggleKeyBtn = document.getElementById("key-toggle");
let toggleFormBtn = document.getElementById("form-toggle");


// Function Definitions
function renderQuestion(question) {
    legend.textContent = `Question ${curQuestion + 1}`;
    queryP.textContent = question.query;
    for(let i = 0; i < radios.length; i++) {
        labels[i].textContent = question.options[i];
        radios[i].checked = false;
        radios[i].disabled = false;
        optionDivs[i].classList.remove("correct");
        optionDivs[i].classList.remove("incorrect");
    }
    if (question.choice != -1) {
        chooseOption(question.choice);
    }
}

function renderResults(e) {
    e.preventDefault();
    form.style.display = "none";
    resultDiv.style.display = "";
    submitBtn.style.display = "none";
    nextBtn.style.display = "";
    nextBtn.style.visibility = "hidden";
    let score = 0;
    for (let i = 0; i < NUMQUESTIONS; i++) {
        score += (questions[i].answer == questions[i].choice);
    }
    scoreP.textContent = `Your Score Was ${score}/${NUMQUESTIONS}!`;
    populateAnswerTable();
    resultsShown = true;
}

function chooseOption(choice) {
    let question = questions[curQuestion]
    for (let i = 0; i < radios.length; i++) {
        radios[i].disabled = true;
    }

    question.choice = choice;
    if (question.choice != question.answer && question.choice != -1) {
        optionDivs[choice].classList.add("incorrect")
    }
    optionDivs[question.answer].classList.add("correct");
    nextBtn.disabled = false;
    let onLastQuestion = curQuestion >= NUMQUESTIONS-1;
    nextBtn.style.visibility = resultsShown && onLastQuestion  ? "hidden" : "";
    submitBtn.style.visibility = onLastQuestion ? "" : "hidden";
}

function getPrevQuestion(e) {
    e.preventDefault();
    curQuestion--;
    renderQuestion(questions[curQuestion]);
    prevBtn.style.visibility = curQuestion <= 0 ? "hidden" : "";
    nextBtn.style.display = "";
    submitBtn.style.display = "none"
}

function getNextQuestion(e) {
    e.preventDefault();
    nextBtn.disabled = true;
    curQuestion++;
    renderQuestion(questions[curQuestion]);

    prevBtn.style.visibility = "visible";
    
    if (curQuestion >= NUMQUESTIONS - 1 && !resultsShown) {
        nextBtn.style.display = "none";
        submitBtn.style.display = "";
    } else {
        nextBtn.style.display = "";
        submitBtn.style.display = "none";
    }

    let choice = questions[curQuestion].choice
    if (choice != -1) chooseOption(choice);
}

function populateAnswerTable() {
    for (let i = 0; i < NUMQUESTIONS; i++) {
        let question = questions[i];

        let tr = document.createElement("tr");
        let tdNumber = document.createElement("td");
        let tdQuery = document.createElement("td");
        let tdCorrect = document.createElement("td");
        
        tdNumber.textContent = i+1;
        tdQuery.textContent = question.query;
        tdCorrect.textContent = question.options[question.answer];
        answerTable.appendChild(tr);
        tr.appendChild(tdNumber);
        tr.appendChild(tdQuery);
        tr.appendChild(tdCorrect);

    }
}

function toggleAnswerKey() {
    if (answerKey.style.display == "none") {
        toggleKeyBtn.textContent = "Hide the Answer Key"
        answerKey.style.display = "";
    } else {
        toggleKeyBtn.textContent = "Show the Answer Key"
        answerKey.style.display = "none";
    }
}

function toggleForm() {
    if (form.style.display == "none") {
        toggleFormBtn.textContent = "Hide the Quiz"
        curQuestion = 0;
        renderQuestion(questions[0]);
        form.style.display = "";
    } else {
        toggleFormBtn.textContent = "Show the Quiz"
        form.style.display = "none";
    }
    
}

// Event Listeners

for (let i = 0; i < radios.length; i++) {
    radios[i].style.display = "none";
    optionDivs[i].addEventListener('click', () => {
        let radio = radios[i];
        if (radio.disabled == false) {
            let choice = radio.id;
            radio.checked = true;
            chooseOption(choice);
        }
    })
}

prevBtn.addEventListener("click", getPrevQuestion)

nextBtn.addEventListener("click", getNextQuestion)

submitBtn.addEventListener("click", renderResults);

toggleKeyBtn.addEventListener("click", toggleAnswerKey);

toggleFormBtn.addEventListener("click", toggleForm);


// Startup Code
resultDiv.style.display = "none";
submitBtn.style.display = "none";
prevBtn.style.visibility = "hidden";
nextBtn.disabled = true;
renderQuestion(questions[curQuestion]);
