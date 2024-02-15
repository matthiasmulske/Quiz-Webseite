// Funktion zum Erstellen der Buttons und Hinzufügen zum Dokument
function createButton(text) {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.width = '200px'; // Setze die Breite der Buttons
    button.style.height = '50px'; // Setze die Höhe der Buttons
    button.style.backgroundColor = '#3498db'; // Ändere die Hintergrundfarbe der Buttons
    button.style.color = 'white'; // Ändere die Textfarbe der Buttons
    button.style.border = 'none'; // Entferne den Rand der Buttons
    button.style.borderRadius = '5px'; // Runde die Ecken der Buttons
    button.style.marginBottom = '20px'; // Setze den Abstand zwischen den Buttons
    document.body.appendChild(button); // Füge den Button dem Dokument hinzu
    return button;
}

// Funktion, um die Buttons zu initialisieren und zu positionieren
function Login() {
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

    // Füge einen Abstand zwischen den Buttons hinzu
    const buttonMargin = '10px'; // Setze den gewünschten Abstand
    newQuestionButton.style.marginBottom = buttonMargin;
    answerQuestionButton.style.marginBottom = buttonMargin;

    // Zentriere die Buttons horizontal und vertikal
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.flexDirection = 'column'; // Buttons untereinander anordnen

    // Füge die Buttons dem Dokument hinzu
    document.body.appendChild(newQuestionButton);
    document.body.appendChild(answerQuestionButton);
}

// Rufe die Funktion zum Erstellen der Buttons auf, sobald das Dokument geladen ist
document.addEventListener('DOMContentLoaded', Login);