const questions = [
    "Czy lubisz rozwiązywać problemy techniczne?",
    "Czy interesujesz się programowaniem?",
    "Czy często majsterkujesz przy komputerze?",
    "Czy chciałbyś uczyć się języków programowania?",
    "Czy lubisz rozwiązywać łamigłówki logiczne?",
    "Czy potrafisz samodzielnie znaleźć rozwiązania w Google?",
    "Czy interesuje Cię cyberbezpieczeństwo?",
    "Czy chcesz pracować w branży IT?",
    "Czy potrafisz skupić się na rozwiązywaniu problemu przez długi czas?",
    "Czy lubisz pracować z bazami danych?",
    "Czy potrafisz skupić się na rozwiązywaniu problemu przez długi czas?",
    "Czy chcesz tworzyć strony internetowe lub aplikacje?",
    "Czy dobrze radzisz sobie z nowymi technologiami?"
];

let shuffledQuestions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startQuiz() {
    shuffledQuestions = shuffleArray([...questions]);
    currentQuestion = 0;
    score = 0;
    document.getElementById("quiz").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");
    showQuestion();
}

function startTimer() {
    timeLeft = 10;
    document.getElementById("time-left").innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time-left").innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function showQuestion() {
    if (currentQuestion < shuffledQuestions.length) {
        document.getElementById("question").innerText = shuffledQuestions[currentQuestion];
        document.querySelectorAll(".btn").forEach(btn => btn.classList.remove("selected"));
        startTimer();
        updateProgress();
    } else {
        showResult();
    }
}

function answer(isYes) {
    clearInterval(timer);
    if (isYes) score++;

    document.querySelectorAll(".btn").forEach(btn => btn.classList.remove("selected"));
    event.target.classList.add("selected");

    setTimeout(() => nextQuestion(), 500);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < shuffledQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
}

function showResult() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    let resultText = "";
    if (score >= Math.floor(questions.length * 0.75)) {
        resultText = "🎉 Masz ogromny talent do informatyki! Technik informatyk to dla Ciebie świetny wybór!";
    } else if (score >= Math.floor(questions.length * 0.5)) {
        resultText = "🤔 Masz predyspozycje do informatyki, warto spróbować!";
    } else {
        resultText = "😕 Może warto przemyśleć inną ścieżkę zawodową?";
    }

    document.getElementById("result-text").innerText = resultText;
}

function restartQuiz() {
    startQuiz();
}

function shareResult() {
    const text = document.getElementById("result-text").innerText;
    const url = encodeURIComponent(window.location.href);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
    window.open(shareUrl, "_blank");
}

startQuiz();
