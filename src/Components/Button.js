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

// Zentriere die Buttons horizontal und vertikal
document.body.style.display = 'flex';
document.body.style.justifyContent = 'center';
document.body.style.alignItems = 'center';
document.body.style.flexDirection = 'column'; // Buttons untereinander anordnen

// Füge einen Abstand zwischen den Buttons hinzu
const buttonMargin = '10px'; // Setze den gewünschten Abstand
singlePlayerButton.style.marginBottom = buttonMargin;
multiPlayerButton.style.marginBottom = buttonMargin;

// Verschiebe die Buttons weiter nach unten
const bodyMarginTop = '200px'; // Setze den gewünschten oberen Abstand
document.body.style.marginTop = bodyMarginTop;