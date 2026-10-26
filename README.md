#pseudoCodice progettazione

funzione card 

funzione isWelcome

funzione isQuiz

funzione isResult

il nostro stato iniziale è : welcome

cambia nel momento in cui il nostro button con id #start da definire verrà cliccato

cambierà lo stato in quiz

costante  timer (TIMER_DURATION)

funzione timer da mostrare nella card quiz in alto a destra

funzione counterQuestions che mostra il numero della domanda visualizzata su schermo e quante domande ci sono in totale. Visualizzato in alto a sinistra. Da aggiornare con i click. 

dentro la funzione quiz avremo il for della lista manipolata per ottenere la domanda da visualizzare che è un oggetto scelto in modo random dalla funzione random che ordinerà le risposte maniere casuali (sono buttons cliccabili). 

quando l'utente potrà selezionare la risposta desiderata cliccandoci sopra. Quando ci passa sopra con il mouse verrò visualizzato un effetto di hover.

L'utente potrà selezionare una sola opzione.

correct_answer deve essere confrontato con l'oggetto catturato al click della risposta

la funzione di confronto è all'interno del for di isQuiz. Ci sarà un add event listner della singola risposta cliccata che farà partire la funzione.

Verrà visualizzato se la risposta è corretta o meno con un feedback visivo.



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