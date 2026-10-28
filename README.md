
![Logo Epicode](assets/epicode-logo1.png) # EPICODE - Piattaforma Quiz d'Esame 

### Progetto realizzato dal team 5

Questa repository contiene il codice sorgente di un'applicazione web interattiva per la gestione di quiz d'esame a tempo, sviluppata per **EPICODE**. La piattaforma è progettata per valutare le conoscenze in ambito informatico e di sviluppo web attraverso un percorso dinamico a risposta multipla.

---

> **Stato del progetto:** in fase di finalizzazione. Questo file viene aggiornato a mano a mano che il progetto viene realizzato. Consulta le relative sezione per vedere lo stato di queste ultime.

## Indice
- [Funzionalità](#funzionalità)
- [Anteprima](#Anteprima)
- [Tecnologie](#tecnologie)
- [Come Eseguire il Progetto Locale](#come-eseguire-il-progetto-locale)
- [Struttura del progetto](#struttura-del-progetto)
- [Architettura](#Architettura)
- [Come funziona](#come-funziona)
- [Schermata di Benvenuto](#schermata-di-benvenuto)
- [Sessione di Quiz Interattiva](#sessione-di-quiz-interattiva)
- [Schermata dei Risultati](#schermata-dei-risultati)
- [Regole del Quiz](#regole-del-quiz)
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

_Screenshot in arrivo._

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

1. **Stato**: .
2. **Render**: Il timer gestisce il render. (callback di isQuiz) greenArray
3. **Eventi**: .

Una variabile di stato indica quale vista mostrare: benvenuto, quiz o risultati. //da modificare

<!-- TODO [Lisa]: da compilare insieme al team 

RENDERING
il rendering viene gestito in modo condizionale con uno switch in base al nostro stato globale currentscreen 
per cambiare la sezione renderizzato dobbiamo riassegnare lo stato globale e richiamare la funzione render()

-->

---

### Come funziona

Le domande sono oggetti in un array. Ogni oggetto ha, oltre a testo e risposte, un `id` e un `timer` (in secondi). Struttura prevista, **nomi da confermare**:

```js
{
  id: 1,
  domanda: "Cosa significa l'acronimo CPU?",
  rispostaCorretta: "Central Processing Unit",
  risposteSbagliate: ["Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
  timer: 20,
}
```

<!-- TODO [da modificare insieme al team] -->

Array di domande.
  Ogni question è un object con:
   - question: testo della question
   - correct_answer: la risposta corretta (string)
   - incorrect_answers: array di risposte sbagliate (string[])

## 1. Schermata di Benvenuto
- Presentazione delle istruzioni di svolgimento dell'esame.
- Pulsante **"Inizia"** per avviare la sessione di test.

## 2. Sessione di Quiz Interattiva
- **10 domande** casuali su argomenti di Informatica, Programmazione (Java, C++, CSS) e Cultura Tech.
- **Timer a tempo residuo (20 secondi per domanda)** integrato in alto a destra.
- Domande casuali a risposta multipla e *Vero/Falso*.
- Feedback visivo immediato alla sezione della risposta:
  - **Verde**: Risposta corretta.
  - **Rosso**: Risposta errata.

### Timer 

La funzione timer gestisce una serie di funzionalità:
- mostra a schermo il tempo rimanente per rispondere alla domanda. Il tempo residuo viene mostrato in maniera decrescente da 20 a 1.
- gestione di una classe interna che ne definisce lo stile. Quando all'utente mancano 5 secondi per rispondere il timer assume il colore rosso.
- quando manca 1 secondo di tempo la funzione disabilita le opzioni cliccabili e gestisce una classe che fa assumere il colore verde alla risposta. Inoltre la funziona inserisce la risposta vuola, tramite il metodo push, nell'array givenAnswers e fa procedere il quiz alla domanda successiva.

### Contatore

La funzione counter aggiorna il numeratore counterNum a ogni click sulle risposte e mostra schermo la domanda corrente e il numero di domande totali. Raggiunta l'ultima domanda cambia lo stato in "results".

### Domande in ordine casuale

Dentro la funzione isQuiz un callBack a randomLength seleziona un indice casuale tramite la funzione randomLength che utilizza i metodi mathFloor e mathRandom, mostrarla a schermo. Rimuove e ritorna l'elemento con il metodo splice per non ripetere la domanda.

### Risposte in ordine casuale

Un loop all'interno di isQuiz raggrupa le risposte in un array e poi itera in maniera casuale tramite la funziona sopra citata randomLength. Tramite il metodo splice rimuove la risposta selezionata e la inserisce nella lista visualizzata a schermo in modo da avere solo le iterazioni necessarie e sempre diverse.

### Responso risposta

Una condizione dentro la funzione isQuiz che si attiva al click in un opzione di risposta controlla se la risposta è corretta e da una classe specifica a seconda del risultato. Se la risposta è errata viene evidenziata anche la risposta corretta.

## 3. Schermata dei Risultati
- Calcolo automatico del punteggio percentuale.
- Indicatore dell'esito dell'esame.
- Grafico a torta per il conteggio dettagliato delle risposte corretto e/o errate.
- Pulsante **"Ricomincia"** per resettare lo stato e riprovare il test.
- Riepilogo delle domande e delle risposte selezionate nel corso del quiz.

### Visualizzazione esito

Questà funzionalità viene gestita da più funzioni all'interno della funzione isResult:
- la funzione calculatePercentage confronte le risposte conservate nell'array givenAnswers sotto la proprietà answers con quelle conservare nell'array di risposte corrette greenArray e fornisce la percentuale di corrispondenza che a sua volta viene confrontata con la costante PASS_THRESHOLD fornita dal cliente. Se la percentuale è maggiore del valore di PASS_THRESHOLD viene visualizzato il responso positivo con la scritta "Promosso", altrimenti "Bocciato".

### Renderizzazione tabella risposte

All'interno isResult viene generato lo scheletro della tabella con testo statico nel tHead. Tramite il metodo forEach, riempiano le sezioni della tabella in maniera dinamica in modo da visualizzare a schermo una riga per domanda con tre colonne corrispondenti a domanda, risposta dell'utente e risposta corretta. 

Il metodo forEach itera l'array di oggetti givenAswers, genera tre td, e ricava le proprietà sotto le chiavi "question" e "answer" per riempirne due, mentre il terzo td viene riempito grazie all'elemento in greenArray presente nello stesso indice. 


## 4. Regole del Quiz

1. Il test consiste in una serie di **10 domande** selezionate casualmente.
2. Per ciascuna domanda si hanno a disposizione **20 secondi di tempo**.
3. È possibile selezionare **una sola risposta** per ciascun quesito.
4. Una volta cliccata l'opzione o scaduto il tempo, la risposta viene confermata e si passa alla domanda successiva.
5. Il tempo stimato per completare il quiz è di circa 3 minuti.

### Convenzioni di codice

- **camelCase** .
- **Variabili, funzioni, costanti e chiavi degli oggetti in inglese**, con nomi che dicono a cosa servono. // da modificare.
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

<code>Albero del dom:
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
  <div id="divTable">
    <table>
      <thead>
        <tr>
          <th>domanda</th>
            <th>Risposta</th>
            <th>Soluzione</th>
            </tr>
          </thead>
            <tbody>
              <tr>
                <td>NomeDomanda</td>
                <td>NomeRisposta</td>
                <td>vero/falso</td>
                </tr>
            </tbody>
    </table>
  <div>
</main>
</code>