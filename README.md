
# EPICODE - Piattaforma Quiz d'Esame --- ![Logo Epicode](assets/epicode-logo1.png)

### Progetto realizzato dal team 5

Questa repository contiene il codice sorgente di un'applicazione web interattiva per la gestione di quiz d'esame a tempo, sviluppata per **EPICODE**. La piattaforma è progettata per valutare le conoscenze in ambito informatico e di sviluppo web attraverso un percorso dinamico a risposta multipla.

---

> **Stato del progetto:** in fase di finalizzazione. Questo file viene aggiornato a mano a mano che il progetto viene realizzato. Consulta le relative sezione per vedere lo stato di queste ultime.

## Indice
- [Funzionalità](#funzionalità)
- [Anteprima](#Anteprima)
- [Tecnologie Utilizzate](#tecnologie-utilizzate)
- [Come Eseguire il Progetto Locale](#come-eseguire-il-progetto-locale)
- [Struttura del progetto](#struttura-del-progetto)
- [Architettura](#architettura)
- [Albero del dom](#albero-del-dom)
- [Come funziona](#come-funziona)
- [Convenzioni di codice](#convenzioni-di-codice)
- [Il team 5 e il flusso di lavoro](#il-team-5-e-il-flusso-di-lavoro)


### Funzionalità

L'applicazione ha un'interfaccia moderna e reattiva con uno stile visivo curato e un flusso utente strutturato in tre fasi principali:

1. **Schermata di benvenuto**: presentazione delle istruzioni di svolgimento dell'esame ed è presente il pulsante **Inizia**.
2. **Sessione di Quiz Interattiva**: domande casuali a risposta multipla e *Vero/Falso*.
3. **Schermata dei Risultati**: risultati del quiz mostrati in forma percentuale e grafica.

**Funzionalità principali:**

- **Timer** mostra a schermo il tempo residuo per poter rispondere alla domanda.
- **Contatore** mostra progressivamente il numero della domande totali e della domanda visualizzata a schermo.
- **Domande in ordine casuale** seleziona una domanda da visualizzare a schermo dall'array in maniera casuale.
- **Risposte in ordine casuale** mostra le risposte disponibili in ordine casuale. 
- **Responso risposta** dopo la selezione della risposta viene visualizzato immediatamente un responso sulla correttezza o meno della suddetta.
- **Visualizzazione esito** mostra a schermo l'esito in forma percentuale, scritta e grafica.
- **Renderizzazione tabella risposte** mostra a schermo domande con relativa risposta selezionata dall'utente con a fianco la risposta corretta.

## Anteprima

- [Pagina di benvenuto](assets/img/welcome.png)
- [Quiz](assets/img/quiz.png)
- [Risultati](assets/img/result1.png)
- [Lista domande](assets/img/result2.png)
- [Risultato simpatico](assets/img/result3.png)


## Tecnologie Utilizzate

- **HTML5**: Strutturazione semantica dell'interfaccia utente.
- **CSS3**: Styling moderno e layout responsive.
- **JavaScript (ES6+)**: Gestione dello stato dell'applicazione, timer dinamico, logica del quiz e calcolo del punteggio finale.

## Come Eseguire il Progetto Locale

1. **Clona il repository**:
   ```bash
   git clone https://github.com/Fabioiad2/Team-5-Progetto-Build-week-1
   ```

2. **Apri l'applicazione**:
   Apri il file `index.html` direttamente nel tuo browser preferito oppure utilizza un'estensione come **Live Server** su VS Code.

---

## Struttura del progetto

```text
.
├── index.html                 pagina unica con il contenitore #app
├── README.md
└── assets/
    ├── bg.jpg                 sfondo
    ├── epicode-logo.png       logo
    ├── css/
    │   └── style.css          stile
    └── js/
         └── script.js         pagina che contiene tutte le funzionalità

```

---

### Architettura

L'app segue il pattern **stato → render → eventi**:

1. **Stato**: La variabile "currentScreen" gestiste lo stato dell'applicazione.
2. **Render**: La funzione Render utilizza la condizione switch per renderizzare a seconda dello stato. Lo stato può assumere tre valori: "welcome", "quiz" e "results".
3. **Eventi**:
- All'inizializzazione currentScreen è dichiarata come "welcome".
- Il bottone "start" cambia lo stato, avvia la funzione "timer" e chiama la funzione "render".
- Nello stato "isQuiz" viene renderizzata la domanda che presenta le risposte disponibili cliccabili, un bottone "skip" che permette di saltare la domanda e un bottone "restart" che fa ricominciare il quiz. Nel momento in cui una risposta viene cliccata:
- Disabilità tutte le opzioni in modo che l'utente non possa selezionare più di un opzione alla volta;
- Evidenzia l'opzione di verde o rosso a seconda del risultato, se la risposta è sbagliata evidenzia anche quella corretta;
- Salva in un array "givenAnswers" come oggetto la coppia domanda risposta selezionata dall'utente;
- Salva anche le risposte corrette in un secondo array "greenArray";
- Ritarda il "render" successivo di due secondi tramite la funzione setTimeout per permettere all'utente di visualizzare gli effetti grafici di esito della domanda;
- Completando il quiz viene aggiornato lo stato a "results" e chiamato il render.
- Nello stato "isResult" vieve renderizzato il risultato del quiz, così presentato: percentuale, scritta "Promosso" o "Bocciato",  grafico a ciambella ed a schermo è presente il bottone "Visualizza" che permette di visualizzare la tabella contenente tutte le domande del quiz con le relative risposte corrette e quelle selezionate dall'utente. Qui è inoltre presente un tasto "restart" che ricarica la pagina.

---

## Albero del dom

```html
<!-- Welcome -->
<main id="app">
  <div class="welcome">
    <h2 class="title">Benvenuto al tuo esame!</h2>
    <p class="intro">...<span>20 secondi</span>...</p>
    <button class="start">Inizia</button>
  </div>
</main>

<!-- Quiz -->
<main id="app">
  <div class="container">
    <div id="counter">Domanda: X su 10</div>
  </div>
  <div id="timer">
    <p>20</p>
  </div>
  <h2 class="question">Testo Domanda</h2>
  <div class="questionnaire">
    <ul class="answers">
      <li>
        <button class="optionButton (correct|wrong)">Risposta</button>
      </li>
    </ul>
    <div class= "buttonQ">
      <button class="skip">Salta</button>
      <button class="restartQ">Salta</button> 
    </div>
    <div class= "divDot"> 
      <div class= "purple"> </div>
    </div>
  </div>
</main>

<!-- Result -->
<main id="app">
  <div class="results">
    <h2 class="resultsTitle">Risultati</h2>
    <p>Quiz completato!</p>
    <div id="graph" class="graph">
      <span class="percentage">XX%</span>
    </div>
    <article>
      <ul class="legend">
        <li><div class="colorGreen"></div><p>Corrette</p></li>
        <li><div class="colorRed"></div><p>Errate</p></li>
        <li><div class="colorGray"></div><p>Nulle</p></li>
      </ul>
    </article>
    <div id="isPassedContainer" class="passed|failed">
      <p>Promosso / Bocciato</p>
    </div>
    <div class="buttonsResult">
      <button class="restart">Ricomincia</button>
      <button class="displayQ">Visualizza risposte</button>
    </div>
    <div class="tableContainer">
      <table class="hide">
        <thead>
          <tr>
            <th>Domande</th>
            <th>Risposte</th>
            <th>Soluzione</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>...</td>
            <td>...</td>
            <td>...</td>
          </tr>
        </tbody>
      </table>
    <div class="easterEgg"></div>
  </div>
</main>
```

## Come funziona

Le domande sono oggetti in un array chiamato "QUESTIONS". Ogni oggetto ha una proprietà domanda "question", una proprietà "correct-answer" contenente la risposta corretta e un array "incorrect_answers" contenente le risposte errate:

```js
{
 question:
      "In Java, quale keyword si usa per impedire che una variabile venga modificata?",
    correct_answer: "final",
    incorrect_answers: ["static", "private", "public"],
}
```

### 1. Schermata di Benvenuto
- Presentazione delle istruzioni di svolgimento dell'esame.
- Pulsante **"Inizia"** per avviare la sessione di test.

### 2. Sessione di Quiz Interattiva
- **10 domande** casuali su argomenti di Informatica, Programmazione e Cultura Tech.
- **Timer a tempo residuo (20 secondi per domanda)** integrato in alto a destra.
- Domande casuali a risposta multipla e *Vero/Falso*.
- Feedback visivo immediato alla sezione della risposta:
  - **Verde**: Risposta corretta.
  - **Rosso**: Risposta errata.

#### Timer 

La funzione timer gestisce una serie di funzionalità:
- mostra a schermo il tempo rimanente per rispondere alla domanda. Il tempo residuo viene mostrato in maniera decrescente da 20 a 1.
- gestione di una classe interna che ne definisce lo stile. Quando all'utente mancano 5 secondi per rispondere il timer assume il colore rosso.
- quando manca 1 secondo di tempo la funzione disabilita le opzioni cliccabili e gestisce una classe che fa assumere il colore verde alla risposta. Inoltre la funziona inserisce la risposta vuola, tramite il metodo push, nell'array givenAnswers e fa procedere il quiz alla domanda successiva.

#### Contatore

La funzione counter aggiorna il numeratore counterNum a ogni click sulle risposte e mostra schermo la domanda corrente e il numero di domande totali. Raggiunta l'ultima domanda cambia lo stato in "results".

#### Domande in ordine casuale

Dentro la funzione isQuiz un callBack a randomLength seleziona un indice casuale tramite la funzione randomLength che utilizza i metodi mathFloor e mathRandom, mostrarla a schermo. Rimuove e ritorna l'elemento con il metodo splice per non ripetere la domanda.

#### Risposte in ordine casuale

Un loop all'interno di isQuiz raggrupa le risposte in un array e poi itera in maniera casuale tramite la funziona sopra citata randomLength. Tramite il metodo splice rimuove la risposta selezionata e la inserisce nella lista visualizzata a schermo in modo da avere solo le iterazioni necessarie e sempre diverse.

#### Responso risposta

Una condizione dentro la funzione isQuiz che si attiva al click in un opzione di risposta controlla se la risposta è corretta e da una classe specifica a seconda del risultato. Se la risposta è errata viene evidenziata anche la risposta corretta.

### 3. Schermata dei Risultati
- Calcolo automatico del punteggio percentuale.
- Indicatore dell'esito dell'esame.
- Grafico a torta per il conteggio dettagliato delle risposte corrette, errate e nulla.
- Pulsante **"Ricomincia"** per resettare lo stato e riprovare il test.
- Pulsante **"Visualizza risposte"** che mostra a schermo il riepilogo delle domande e delle risposte selezionate nel corso del quiz.

#### Visualizzazione esito

Questà funzionalità viene gestita da più funzioni all'interno della funzione isResult:
La funzione calculatePercentage confronte le risposte nell'array givenAnswers, conservate sotto la proprietà answers, con quelle conservare nell'array di risposte corrette greenArray per fornire la percentuale di corrispondenza arrotondata all'intero più vicino. 
Questa viene a sua volta confrontata con la costante PASS_THRESHOLD fornita dal cliente. Se la percentuale è maggiore del valore di PASS_THRESHOLD viene visualizzato il responso positivo con la scritta "Promosso", altrimenti "Bocciato".

#### Renderizzazione tabella risposte

All'interno isResult viene generato lo scheletro della tabella con testo statico nel thead. Tramite il metodo forEach, riempiano le sezioni della tabella in maniera dinamica in modo da visualizzare a schermo una riga per domanda con tre colonne corrispondenti a domanda, risposta dell'utente e risposta corretta.

Il metodo forEach itera l'array di oggetti givenAswers, genera tre td, e ricava le proprietà sotto le chiavi "question" e "answer" per riempirne due, mentre il terzo td viene riempito grazie all'elemento in greenArray presente nello stesso indice. La tabella è resa visibile al click del bottone sopracitato.


### 4. Regole del Quiz

1. Il test consiste in una serie di **10 domande** selezionate casualmente.
2. Per ciascuna domanda si hanno a disposizione **20 secondi di tempo**.
3. È possibile selezionare **una sola risposta** per ciascun quesito.
4. Una volta cliccata l'opzione o scaduto il tempo, la risposta viene confermata e si passa alla domanda successiva.
5. Il tempo stimato per completare il quiz è di circa 3 minuti.

### Aspetto grafico

L'applicazione si presenta con un'interfaccia moderna con sfondo scuro sfumato in viola e il logo **EPICODE** in alto. Al centro si trova un riquadro bianco fumo con angoli arrotondati che mostra il messaggio di benvenuto, le regole dell'esame e il pulsante **"Inizia"** per avviare il quiz. Tutti i pulsanti hanno un effetto hover. Quando ci passi sopra si colora di viola chiaro e il cursore diventa un puntatore.
Una volta avviato il quiz la schermata mantiene lo stesso stile grafico. All'interno del riquadro mostra la domanda corrente, un timer rettangolare con i secondi rimanenti che si colora di rosso quando il tempo sta per scadere per mettere premura all'utente, dei pulsanti per le opzioni per le risposte disposte in verticale e dei pallini che si colorano ad uno ad uno dopo aver risposto a una domanda. Le risposte corrette vengono visualizzate di colore rosso e quelle giusta di colore verde in maniera intuitiva.
Quando il quiz finisce la schermata mostra a schermo l'esito. Un grafico a ciambella mostra quante domande selezionate sono corrette, errate e/o nulle. Il grafico è accompagnato da una breve leggenda che ne rende il contenuto più chiaro. L'esito è rafforzato da un numero percentuale delle risposte corrette e la scritta "Promosso/Bocciato" con una simpatica faccina a fianco. Premendo sui bottoni sottostanti è possibile vedere riavviare il quiz e mostrare a schermo una tabella con al suo interno le domande con le risposte selezionate dall'utente e le risposte corrette.


### Convenzioni di codice

- **camelCase** per tutte le variabili e **maiuscolo** per le costanti.
- **Variabili, funzioni, costanti e chiavi degli oggetti in inglese**, con nomi intuitivi.
- **Commenti che favoriscono la comprensione del codice**.
- Solo `const` e `let`, mai `var`.
- `querySelector` / `querySelectorAll` per il DOM.
- `addEventListener`, mai `onclick` inline nell'HTML.

### Il team 5 e il flusso di lavoro

Il team lavora seguendo dei ruoli definiti come sotto:

| Persona | Ruolo |
|---|---|
| Miriam Caridi | Team leader |
| Fabio Iadicicco | Gestore Git, JavaScript |
| Lisa Irene Sciacca | README, CSS |
| Adriano Sant'Angelo | JavaScript |
| Charlie Cenni | CSS |
| Matteo Brucculeri | JavaScript |

Il team lavora nel seguente modo:
- **Live Share** In base alle necessità del momento un membro del team ha fatto da host e ha lavorato insieme agli altri sul codice in contemporanea.
- **Una sola persona** gestisce la repository, branch, merge e pull request con il supporto del team.
- La repository del progetto è presente sul profilo git di chi gestisce Git.