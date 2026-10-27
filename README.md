#pseudoCodice progettazione

il modo di ridenominare le variabili, id e classi scelto è in lingua inglese e in camelCase

funzione render {

    dentro card base mettiamo gli if

  se currentScreen{
    isWelcome()
  }
  se isQuiz{
    isQuiz
}
  se IsResult{
    isResult
  }

}  

il nostro stato iniziale è : welcome

cambia nel momento in cui il nostro button con id #start da definire verrà cliccato

cambierà lo stato in quiz

costante  timer (TIMER_DURATION)

funzione timeout da mostrare nella card quiz in alto a destra

funzione counterQuestions che mostra il numero della domanda visualizzata su schermo e quante domande ci sono in totale. Visualizzato in alto a sinistra. Da decidere come va incrementato. 

dentro la funzione quiz avremo il for della lista manipolata per ottenere la domanda da visualizzare che è un oggetto scelto in modo random dalla funzione random che ordinerà le risposte maniere casuali (sono buttons cliccabili). 

quando l'utente potrà selezionare la risposta desiderata cliccandoci sopra. Quando ci passa sopra con il mouse verrò visualizzato un effetto di hover.

L'utente potrà selezionare una sola opzione.

correct_answer deve essere confrontato con l'oggetto catturato al click della risposta

la funzione di confronto è all'interno del for di isQuiz. Ci sarà un add event listner della singola risposta cliccata che farà partire la funzione.

Verrà visualizzato se la risposta è corretta o meno con un feedback visivo.

Quando mancano 5 secondi nel timer cambia colore e diventa rosso.

Quando manca 1 secondo le risposte non sono più cliccabili.

Se l'utente non sceglie nessuna risposta entro la scadenza "timer" la funzione timeout che quando il timer arriva a 0 array + 1 quindi passa alla domanda successiva.
Si deve visualizzare la risposta corretta che resta su schermo per 1 secondo.

Quando le domande finiscono lo stato cambia in "result".

Nella nuova card viene mostrato all'utente il risultato finale del quiz.
Abbiamo una percentuale di risposte esatte data dalla funzione percentage.

variabile resultQuiz nella card se è isResult se promosso quindi almeno il 60% delle risposte è corretto stampa promosso altrimenti bocciato con colori diversi da definire (verde,rosso).
Viene visualizzato anche un grafico a torta. 

Button "Restart" con logica per il reset. (window.reload()) per essere sicuri l'app ripartirà dallo stato iniziale

Sotto il button verrà visualizzata la ul di risposte date dall'utente.
Verrano mostrate tutte le domande estratte durante il quiz con le relative risposte selezionate e il risultato corretto/errata. 

Albero del dom:
### WELCOME
<main id="app">
  <div class="welcome">
    <h2 class="title">
    <p class="intro"><span>20 secondi</span></p>
    <button class= 'start'></button>
  </div>
</main>

### QUIZ
<main id="app">
  <div class="quiz">
    <div class="container">
      <div id="counter">
      </div>
      <div id="timer" class="warning">
      </div>
      <p></p>
    </div>
   <div class="questionnaire"> 
    <h2 class="question">
     <ul class="answers">
       <li class="correct wrong">
       <button class="optionButton"></button>
       </li>
     </ul>
    </div>
  </div>
</main>

### RESULT
<main id="app">
  <div class="results">
    <h2 class="resultsTitle">Risultati</h2>
    <p>Hai completato il quiz.</p>
    <span class="percentage"></span>
    <div class="passed" class="failed">
      <p>Promosso - Bocciato</p>
    </div>
    <div id="graph">
    </div>
    <button class="restart">
  </div>
</main>







/*
function IsResult() {
  appcontainer.textContent = "";

  let divResult = document.createElement("div");
  divResult.classList.add("results");

  let titoloSection = document.createElement("h2");
  titoloSection.classList.add("resultsTitle");
  titoloSection.textContent = "result";

  //Calcolo della percentuale reale basata sulle risposte corrette 
  
  let correctCount = givenAnswers.filter(ans => ans.isCorrect).length; // va cambiato 
  let totalCount = TOTAL_QUESTIONS
  let calPerc = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  
  let percentage = document.createElement("span");

  percentage.textContent = `${calPerc}%`; Adri  

   //ARRAY RISPOSTE DATE
      givenAnswers.push({ question: question, answer: answer });
      //ARRAY RISPOSTE CORRETTE
      greenArray.push(correct_answer);

  percentage.textContent = "100%"; Fabio placheholder 
 
  let isPassedContainer = document.createElement("div");
  isPassedContainer.classList.add("passed");

  let pIsPassed = document.createElement("p");
  pIsPassed.textContent = "null";


  let divGraph = document.createElement("div");
  divGraph.classList.add("graph");


  let quizCompleted = document.createElement("p");
  quizCompleted.textContent = "Quiz completato";
  
  // isPassed indica promosso o bocciato in inglese
  
  
  
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
 
function checkResult(percentage, element){
  if (percentage >= 60){
element.textContent = "Superato"

  }
} 

// creazione della tabella del resoconto 




function calcolaPercentuale() {
  if (givenAnswers.length === 0) return 0; // evita la divisione per zero

  const corrette = givenAnswers.filter(
    (risposta, i) => risposta.answer === greenArray[i]
  ).length;

  return (corrette / givenAnswers.length) * 100;
}

console.log(calcolaPercentuale()); 



*/


Progetto realizzato da:
Fabio Iadicicco
Miriam Caridi
Matteo Brucculeri
Adriano Sant'Angelo
Lisa Irene Sciacca
Charlie Cenni