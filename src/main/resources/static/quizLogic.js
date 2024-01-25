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
        selection: -1
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
        selection: -1
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
        selection: -1
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
        selection: -1
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
        selection: -1
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
        selection: -1
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
        selection: -1
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
        selection: -1
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
        selection: -1
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
        selection: -1
    }
]
let curQuestion = 0;
const NUMQUESTIONS = 10;

// Get DOM elements
let form = document.querySelector("form");
let legend = document.querySelector("legend");
let queryP = document.getElementById("query");
let radios = document.querySelectorAll("input[type='radio']");
let labels = document.querySelectorAll("label");
let prevBtn = document.getElementById("previous");
let nextBtn = document.getElementById("next");
let submitBtn = document.querySelector("input[type='submit']");


function renderQuestion(question) {
    legend.textContent = "Question " + (curQuestion+1);
    queryP.textContent = question.query;
    for(let i = 0; i < radios.length; i++) {
        labels[i].textContent = question.options[i];
        radios[i].checked = false;
    }
    if (question.selection != -1) {
        radios[question.selection].checked = true;
    }
}

function renderResults(e) {
    e.preventDefault()
    let score = 0;
    for (let i = 0; i < NUMQUESTIONS; i++) {
        score += (questions[i].answer == questions[i].selection);
    }
}


// Add Event Listeners

for (let i = 0; i < 4; i++) {
    radios[i].addEventListener('click', (e) => {
        questions[curQuestion].selection = e.target.id;
    })
}

prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    curQuestion--;
    renderQuestion(questions[curQuestion]);

    nextBtn.style.visibility = "visible";
    if (curQuestion <= 0) prevBtn.style.visibility = "hidden";
})

nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    curQuestion++;
    renderQuestion(questions[curQuestion]);

    prevBtn.style.visibility = "visible";
    if (curQuestion >= NUMQUESTIONS - 1) nextBtn.style.visibility = "hidden";
})

// Startup Code
prevBtn.style.visibility = "hidden";
renderQuestion(questions[curQuestion]);