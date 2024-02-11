// Button.js

// Funktion zum Erstellen der Buttons und Hinzufügen zum Dokument
function createButtons() {
    // Erstelle den Einzelspieler-Button
    const singlePlayerButton = createButton('Einzelspieler');
    singlePlayerButton.addEventListener('click', function() {
        window.location.href = 'einzelspieler.html'; // Navigiere zu Einzelspielerseite
    });
   // Erstelle den Mehrspieler-Button
   const multiPlayerButton = createButton('Mehrspieler');
   multiPlayerButton.addEventListener('click', function() {
       window.location.href = 'mehrspieler.html'; // Navigiere zu Mehrspielerseite
   });
   // Erstelle den Button für Neue Quizfrage
   const newQuestionButton = createButton('Neue Quizfrage');
   newQuestionButton.addEventListener('click', function() {
       window.location.href = 'neue_quizfrage.html'; // Navigiere zu Seite für Neue Quizfrage
   });
   // Erstelle den Button für Quizfrage beantworten
   const answerQuestionButton = createButton('Quizfrage beantworten');
   answerQuestionButton.addEventListener('click', function() {
       window.location.href = 'quizfrage_beantworten.html'; // Navigiere zu Seite für Quizfrage beantworten
   });
    // Erstelle den Datenschutz-Button
    const privacyButton = createButton('Datenschutz');
    privacyButton.addEventListener('click', function() {
        window.location.href = 'datenschutz.html'; // Navigiere zu Datenschutzseite
    });
    // Erstelle den Impressum-Button
    const imprintButton = createButton('Impressum');
    imprintButton.addEventListener('click', function() {
        window.location.href = 'impressum.html'; // Navigiere zu Impressumseite
    });
    // Erstelle den AGBs-Button
    const agbButton = createButton('AGBs');
    agbButton.addEventListener('click', function() {
        window.location.href = 'agb.html'; // Navigiere zu AGBs-Seite
    });
   // Erstelle den Login-Button
   const loginButton = createButton('Login');
   loginButton.addEventListener('click', function() {
       window.location.href = 'login.html'; // Navigiere zu Login-Seite
   });
  
    // Füge die Buttons dem Dokument hinzu
    document.body.appendChild(singlePlayerButton);
    document.body.appendChild(multiPlayerButton);
    document.body.appendChild(privacyButton);
    document.body.appendChild(imprintButton);
    document.body.appendChild(agbButton);
    document.body.appendChild(loginButton);
    document.body.appendChild(newQuestionButton);
    document.body.appendChild(answerQuestionButton);
  }
  
  // Funktion zum Erstellen eines Buttons
  function createButton(text) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = 'button'; // Füge die Klasse 'button' hinzu
    return button;
  }
  
  // Rufe die Funktion zum Erstellen der Buttons auf, sobald das Dokument geladen ist
  document.addEventListener('DOMContentLoaded', createButtons);