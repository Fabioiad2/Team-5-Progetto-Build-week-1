/*
  REGOLE
  - Codice in JavaScript moderno: solo const/let, mai var.
  - DOM: usa querySelector / querySelectorAll.
  - Eventi: usa addEventListener (mai onclick inline nell'HTML).
  - Pattern: stato → render → eventi.
*/

/*
  Array di domande.
  Ogni question è un object con:
   - question: testo della question
   - correct_answer: la risposta corretta (string)
   - incorrect_answers: array di risposte sbagliate (string[])
*/
const QUESTIONS = [
  {
    question: "Cosa significa l'acronimo CPU?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    question:
      "In Java, quale keyword si usa per impedire che una variabile venga modificata?",
    correct_answer: "final",
    incorrect_answers: ["static", "private", "public"],
  },
  {
    question: "Il logo di Snapchat è una campana.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question:
      "I puntatori sono stati introdotti in C++ e non c'erano nel linguaggio C originale.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question:
      "Qual è il formato immagine più usato per i loghi nel database di Wikimedia?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    question: "Cosa significa l'acronimo CSS?",
    correct_answer: "Cascading Style Sheets",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheets",
      "Computer Style Sheets",
    ],
  },
  {
    question: "Qual è il nome in codice del sistema operativo Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    question: "Qual era il limite originale di caratteri di un Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    question: "Linux è stato creato come alternativa a Windows XP.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question:
      "Quale linguaggio di programmazione condivide il nome con un'isola dell'Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

/* Costanti del quiz */
const TOTAL_QUESTIONS = QUESTIONS.length;
const PASS_THRESHOLD = 60; // percentuale minima per "Promosso"
const FEEDBACK_DELAY = 1500; // ms di attesa dopo risposta prima di avanzare
const TIMER_DURATION = 20; // secondi per ogni question

/* Stato globale */
let currentScreen = "welcome"; // "welcome" | "quiz" | "results"
let currentQuestion = 0;
let score = 0;
let timerId = null;

//VAR & CONST
const appcontainer = document.querySelector("#app");
const givenAnswers = [];
let counterNum = 0;

/* SCRIVI QUI LE TUE FUNZIONI:
   - render() che chiama renderWelcome / renderQuiz / renderResults in base a currentScreen
   - renderWelcome() per la schermata iniziale con button Inizia
   - renderQuiz() per la question corrente con i button risposta + counter + timer
   - renderResults() per la schermata finale con percentuale + barre + verdetto
   - startTimer() / stopTimer() per il countdown
   - handleAnswer(button, answer) per il click su una risposta
   - handleTimeUp() per il tempo scaduto
   - advance() per andare alla question successiva o ai risultati
*/

function isWelcome() {
  let divWelcome = document.createElement("div");
  divWelcome.classList.add("welcome");
  let title = document.createElement("h2");
  title.classList.add("title");
  title.textContent = "Benvenuto al tuo esame";
  let paragraph = document.createElement("p");
  paragraph.classList.add("intro");

  paragraph.innerHTML = `Una serie di dieci domande sul mondo dell'informatica e del web. Per ogni domanda hai <span> 20 secondi </span> di tempo per rispondere.`;
  let startButton = document.createElement("button");
  startButton.classList.add("start");
  startButton.textContent = "Inizia";
  startButton.addEventListener("click", () => {
    console.log(currentScreen, "stato prima");
    currentScreen = "quiz";
    console.log(currentScreen, "stato");

    timer();
    render();
  });
  appcontainer.appendChild(divWelcome);
  divWelcome.appendChild(title);
  divWelcome.appendChild(paragraph);
  divWelcome.appendChild(startButton);
}

function randomLength(a) {
  return Math.floor(Math.random() * a.length); //return un intero a caso da 0 a lenght
}
let timer20;

function isQuiz(param = QUESTIONS) {
  //RESET CARD
  appcontainer.textContent = "";
  let divQuiz = document.createElement("div");
  divQuiz.classList.add("quiz");


  //COUNTER
  counterNum++;
  let container = document.createElement("div");
  let counterDiv = document.createElement("div");
  counterDiv.id = "counter"; // id per CSS <<-------------------------
  container.classList = "container";
  appcontainer.appendChild(container);
  container.appendChild(counterDiv);
  counterDiv.textContent = ` ${counterNum}/${TOTAL_QUESTIONS}`;

  //LOG
  console.log("sono qui in quiz");

  //TIMER
  timer20 = document.createElement("span");
  let timerDiv = document.createElement("div");
  timerDiv.id = "timer";
  timer20.textContent = 20;
  timerDiv.appendChild(timer20);
  appcontainer.appendChild(timerDiv);

  //LOGICA
  let i = randomLength(param);
  const [q] = param.splice(i, 1); //salvo l'oggetto selezionato  sotto una const e lo rimuovo dall'array
  const {
    question: question,
    correct_answer: correct_answer,
    incorrect_answers: z,
  } = q; //destrutturo l'oggetto per richiamare le variabili
  let allAnswers = [correct_answer, ...z];

  //ELEMENTI DI TESTO
  let h2 = document.createElement("h2");
  let ul = document.createElement("ul");
  h2.textContent = question;
  appcontainer.appendChild(h2);
  appcontainer.appendChild(ul);

  //questionnaire
  let divQuestionnaire = document.createElement("div");
  divQuestionnaire.classList.add("questionnaire");
  let h2Questionnaire = document.createElement("h2");
  h2Questionnaire.classList.add("question");

  let greenLight = null;
  //OPZIONI CLICCABILI
  while (allAnswers.length > 0) {
    const index = randomLength(allAnswers); // 0 … length - 1
    const [answer] = allAnswers.splice(index, 1); // la salvo come variabile e la rimuovo dall'array per non richiamarla

    const li = document.createElement("li");
    const option = document.createElement("button"); //opzioni come elementi di lisat cliccabili
    option.textContent = answer;
    option.classList.add("optionButton"); //classe per CSS

    if (answer === correct_answer) {
      greenLight = option;
    }
    li.appendChild(option);
    ul.appendChild(li);

    //EVENT-LISTENER
    option.addEventListener("click", (event) => {
      event.preventDefault();

      //CHECK RISPOSTA CORRETTA
      if (answer === correct_answer) {
        option.classList.add("correct");
        console.log("CORRECT!");
      } else {
        option.classList.add("wrong");
        greenLight.classList.add("correct");
        console.log("WRONG!");
      }

      //ARRAY RISPOSTE
      givenAnswers.push({ question: question, answer: answer });

      setTimeout(() => {
        if (QUESTIONS.length === 0) {
          currentScreen = "results";
        }
        a = TIMER_DURATION;
        render();
      }, 2000);

      console.log(givenAnswers);
    });
  }
}

function IsResult() {
  appcontainer.textContent = "";
  let divResult = document.createElement("div");
  divResult.classList.add("results");
  let titoloSection = document.createElement("h2");
  let quizCompleted = document.createElement("p");
  quizCompleted.textContent = "Quiz completato";
  titoloSection.classList.add("resultsTitle");
  titoloSection.textContent = "result";
  // isPassed indica promosso o bocciato in inglese
  let isPassedContainer = document.createElement("div");
  isPassedContainer.classList.add("passed");
  let pIsPassed = document.createElement("p");
  pIsPassed.textContent = "null";
  let divGraph = document.createElement("div");
  divGraph.classList.add("graph");
  let percentage = document.createElement("span");
  percentage.textContent = "100%";
  let buttonRestart = document.createElement("button");
  buttonRestart.classList.add("restart");
  buttonRestart.textContent = "Ricomincia";
  buttonRestart.addEventListener("click", () => {
    window.location.reload();
  });
  appcontainer.appendChild(divResult);
  divResult.appendChild(titoloSection);
  divResult.appendChild(quizCompleted);
  divResult.appendChild(percentage);
  divResult.appendChild(isPassedContainer);
  isPassedContainer.appendChild(pIsPassed);
  divResult.appendChild(divGraph);
  divResult.appendChild(buttonRestart);
}

function render() {
  switch (currentScreen) {
    case "welcome":
      isWelcome();
      break;
    case "quiz":
      isQuiz();
      break;
    case "results":
      IsResult();
      break;
  }
}

render();
let a = TIMER_DURATION;

function timer() {
  timerId = setInterval(() => {
    a--;

    if (a <= 0 && QUESTIONS.length === 0) {
      clearInterval(timerId); // Interrompe l'intervallo
      currentScreen = "results";
      render();
      return;
    } else if (a === 0) {
      a = TIMER_DURATION;
      render();
    }

    timer20.textContent = a;

    console.log(a);
  }, 1000);
}
