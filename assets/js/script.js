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
let score = 0;
let timerId = null;

//VAR & CONST
const appcontainer = document.querySelector("#app"); //main
const givenAnswers = []; // arrai {domanda: , risposta:}
const greenArray = [];  //array risposte corrette
let voidAnswers = []; //array risposte vuote
let counterNum = 0;   //numeratore counter
let greenLight = null; //container opzione corretta
let timerDiv = null; //div timer
let timer20 = null; //p timer
let a = TIMER_DURATION;
let currentQuestion = null;

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

//FUNCTION isWELCOME
function isWelcome() {
  //ELEMENTI
  let divWelcome = document.createElement("div");
  let title = document.createElement("h2");
  let paragraph = document.createElement("p");
  let startButton = document.createElement("button");

  // DIAMO CONTENUTO
  title.textContent = "Benvenuto al tuo esame!";
  paragraph.classList.add("intro");

  // DIAMO ATTRIBUTI
  divWelcome.classList.add("welcome");
  title.classList.add("title");
  paragraph.innerHTML = `Preparati ad affrontare il tuo esame. Ti verrà sottoposta una serie di dieci domande sul mondo dell'informatica e del web. Per ogni domanda hai <span> 20 secondi </span> di tempo per rispondere. Il test dura circa 3 minuti.`;

  startButton.classList.add("start");
  startButton.textContent = "Inizia";

  //EVENT-LISTENER
  startButton.addEventListener("click", () => {
    console.log(currentScreen, "stato prima");
    currentScreen = "quiz";
    console.log(currentScreen, "stato");

    timer();
    render();
  });

  //STRUTTURA
  appcontainer.appendChild(divWelcome);
  divWelcome.appendChild(title);
  divWelcome.appendChild(paragraph);
  divWelcome.appendChild(startButton);
}

function randomLength(a) {
  return Math.floor(Math.random() * a.length); //return un intero a caso da 0 a lenght
}

//FUNCTION isQUIZ
function isQuiz(param = QUESTIONS) {
  appcontainer.textContent = "";


  //COUNTER
  counterNum++;
  let container = document.createElement("div");
  let counterDiv = document.createElement("div");
  counterDiv.id = "counter"; // id per CSS <<-------------------------
  container.classList = "container";
  appcontainer.appendChild(container);
  container.appendChild(counterDiv);
  counterDiv.textContent = `Domanda: ${counterNum} su ${TOTAL_QUESTIONS}`;


  //TIMER
  timer20 = document.createElement("p")
  timerDiv = document.createElement("div");
  timerDiv.id = "timer";
  timer20.textContent = 20;
  timerDiv.appendChild(timer20);
  appcontainer.appendChild(timerDiv);

  //ELEMENTI
  let divQuiz = document.createElement("div");
  let h2 = document.createElement("h2");
  let ul = document.createElement("ul");
  let divQ = document.createElement("div");



  //CLASSI
  divQ.classList.add("questionnaire");
  h2.classList.add("question");
  ul.classList.add("answers");
  divQuiz.classList.add("quiz");

  //STRUTTURA
  appcontainer.appendChild(h2);
  appcontainer.appendChild(divQ);
  divQ.appendChild(ul);


  //LOGICA
  let i = randomLength(param);
  const [q] = param.splice(i, 1); //salvo l'oggetto selezionato  sotto una const e lo rimuovo dall'array
  const {
    question: question,
    correct_answer: correct_answer,
    incorrect_answers: z,
  } = q; //destrutturo l'oggetto per richiamare le variabili

  let allAnswers = [correct_answer, ...z];
  currentQuestion = q;
  h2.textContent = question;

  //OPZIONI CLICCABILI
  while (allAnswers.length > 0) {
    const index = randomLength(allAnswers); // 0 … length - 1
    const [answer] = allAnswers.splice(index, 1); // la salvo come variabile e la rimuovo dall'array per non richiamarla

    const li = document.createElement("li");
    const option = document.createElement("button"); //opzioni come elementi di lista cliccabili
    option.textContent = answer;
    option.classList.add("optionButton"); //classe per CSS

    //SALVO L'OPZIONE CORRETTA
    if (answer === correct_answer) {
      greenLight = option;
    }
    li.appendChild(option);
    ul.appendChild(li);

    //EVENT-LISTENER
    option.addEventListener("click", (event) => {
      event.preventDefault();


      //DISABILITA-BOTTONI
      const buttons = document.querySelectorAll('.optionButton');
      buttons.forEach((button) => {
        button.disabled = true;
      });


      //CHECK RISPOSTA CORRETTA
      if (answer === correct_answer) {
        option.classList.add("correct");
        console.log("CORRECT!");
      } else {
        option.classList.add("wrong");
        greenLight.classList.add("correct");
        console.log("WRONG!");
      }


      //ARRAY RISPOSTE DATE + ARRAY RISPOSTE CORRETTE
      givenAnswers.push({ question: question, answer: answer });
      greenArray.push(correct_answer);

      console.log(givenAnswers);
      console.log(greenArray);

      //DELAY
      setTimeout(() => {
        if (QUESTIONS.length === 0) {
          currentScreen = "results";
        }
        a = TIMER_DURATION;
        render();
      }, 2000);

    });
  }
}

//PERCENTUALE
function calculatePercentage() {
  if (givenAnswers.length === 0) return 0; // evita la divisione per zero

  const corrects = givenAnswers.filter(
    (obj, i) => obj.answer === greenArray[i]
  ).length;

  return (corrects / givenAnswers.length) * 100;
}

//CHECK-RESULT
function checkResult(percentuale, testo, contenitore) {
  const passed = (percentuale >= PASS_THRESHOLD); //60
  testo.textContent = passed ? "Promosso" : "Bocciato";
  contenitore.classList.add(passed ? "passed" : "failed");
}


//FUNCTION isRESULT
function isResult() {
  appcontainer.textContent = "";
  //KILL TIMER
  clearInterval(timerId);


  //ELEMENTI
  let divResult = document.createElement("div");
  let titoloSection = document.createElement("h2");
  let quizCompleted = document.createElement("p");
  let isPassedContainer = document.createElement("div");
  let pIsPassed = document.createElement("p");
  let buttonRestart = document.createElement("button");
  let percentage = document.createElement("span");
  let divGraph = document.createElement("div");



  //CONTENUTI
  quizCompleted.textContent = "Quiz completato!";
  titoloSection.textContent = "Risultati";
  isPassedContainer.id = "isPassedContainer";
  pIsPassed.textContent = "null";
  buttonRestart.textContent = "Ricomincia";
  percentage.textContent = `${calculatePercentage()}%`;

  //CLASSI
  divResult.classList.add("results");
  titoloSection.classList.add("resultsTitle");
  divGraph.classList.add("graph");
  buttonRestart.classList.add("restart");
  percentage.classList.add("percentage");

  // TABLE
  const divTable = document.createElement('div')
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const thQuestions = document.createElement('th');
  const thAnswers = document.createElement('th');
  const thSolutions = document.createElement('th');
  const tbody = document.createElement('tbody');
  const tr = document.createElement('tr');
  const voidAnswersCount = document.createElement('p')

  thQuestions.textContent = 'Domande';
  thAnswers.textContent = 'Risposte';
  thSolutions.textContent = 'Soluzione';


  divTable.appendChild(table);
  divTable.classList.add('tableContainer')
  table.appendChild(thead);
  thead.appendChild(tr);
  tr.appendChild(thQuestions);
  tr.appendChild(thAnswers);
  tr.appendChild(thSolutions);

  table.appendChild(tbody);
  tbody.appendChild(tr);
  tr.appendChild(voidAnswersCount);

  //PARSER TABELLA
  givenAnswers.forEach(function (obj, i) {
    const row = document.createElement("tr");

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    let answer= obj.answer;
    if (answer === "") { answer = "Nessuna risposta" };
    
    td1.textContent = obj.question;
    td2.textContent = answer;
    td3.textContent = greenArray[i];

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);

    tbody.appendChild(row);
  });

  //FILTRO
  voidAnswers = givenAnswers.filter(obj => obj.answer === "");
  console.log(voidAnswers, "lista di domande saltate")
  console.log("vuote", voidAnswers.length)
  voidAnswersCount.textContent = `risposte non date ${voidAnswers.length}`;

  //STRUTTURA
  appcontainer.appendChild(divResult);
  divResult.appendChild(titoloSection);
  divResult.appendChild(quizCompleted);
  divResult.appendChild(percentage);
  divResult.appendChild(isPassedContainer);
  isPassedContainer.appendChild(pIsPassed);
  divResult.appendChild(divGraph);
  divResult.appendChild(buttonRestart);
  divResult.appendChild(divTable);


  //CALLBACK >> checkResult
  checkResult(calculatePercentage(), pIsPassed, isPassedContainer);// isPassed indica promosso o bocciato in inglese

  //EVENT-LISTENER
  buttonRestart.addEventListener("click", () => {
    window.location.reload();
  });
}

//RENDER
function render() {
  switch (currentScreen) {
    case "welcome":
      isWelcome();
      break;
    case "quiz":
      isQuiz();
      break;
    case "results":
      isResult();
      break;
  }
}
render();


//TIMER
function timer() {
  timerId = setInterval(() => {
    a--;
    if (a === 5) {
      timerDiv.classList.add("warning");
    }
    if (a === 1) {
      greenLight.classList.add("correct"); //greenLight salva la risposta giusta (optionButton contenente la risposta corretta) ad ogni render di domanda

      const buttons = document.querySelectorAll('.optionButton');

      buttons.forEach((button) => {
        button.disabled = true;
      });
    }


    //time-out ultima domanda
    if (a <= 0 && QUESTIONS.length === 0) {
      givenAnswers.push({ question: currentQuestion.question, answer: "" })
      greenArray.push(currentQuestion.correct_answer);
      currentScreen = "results";
      console.log(QUESTIONS.length)
      console.log('sono nel primo if quindi non ci sono più domande') // non viene mostrato finchè il timer in result non scade
      a = 0;
      render();
      return;
    }
    //time-out normale
    else if (a === 0) {
      a = TIMER_DURATION;
      console.log('time azzerato')
      givenAnswers.push({ question: currentQuestion.question, answer: "" })
      greenArray.push(currentQuestion.correct_answer);
      console.log("else")
      render();
    }

    timer20.textContent = a;

    console.log(a);

  }, 1000);
}

