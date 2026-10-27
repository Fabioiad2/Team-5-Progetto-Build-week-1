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
        <h2></h2>
      </div>
      <div id="timer">
        <span></span>
      </div>
    </div>
   <div class="questionnaire"> 
    <h2 class="question">
     <ul class="answers">
       <li class="correct wrong">
       <button></button>
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



Progetto realizzato da:
Fabio Iadicicco
Miriam Caridi
Matteo Brucculeri
Adriano Sant'Angelo
Lisa Irene Sciacca 