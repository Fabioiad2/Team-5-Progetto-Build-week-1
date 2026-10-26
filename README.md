#pseudoCodice progettazione

funzione card 

funzione isWelcome

funzione isQuiz

funzione is result

il nostro stato iniziale è : welcome

cambia nel momento in cui il nostro button con id #start da definire verrà cliccato

cambierà lo stato in quiz

costante  timer (TIMER_DURATION)

funzione timer

dentro la funzione quiz avremo il for della lista manipolata per ottenere la domanda da visualizzare che è un oggetto scelto in moodo random dalla funzione random che ordinerà le rispste maniere casuali



funzione render {

    dentro card base mettiamo gli if

  se currentScree{
    isWelcome()
  }
  se isQuiz{
    isQuiz
  }
  se IsResult{
    isResult
  }

}