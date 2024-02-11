// Erstelle einen Container für die Buttons
const buttonsContainer = document.createElement('div');
buttonsContainer.style.position = 'fixed';
buttonsContainer.style.bottom = '10px';
buttonsContainer.style.left = '50%';
buttonsContainer.style.transform = 'translateX(-50%)';
buttonsContainer.style.zIndex = '1000';

// Erstelle den Datenschutz-Button
const privacyButton = createButton('Datenschutz');
privacyButton.addEventListener('click', function() {
    window.location.href = 'datenschutz.html'; // Navigiere zu Datenschutzseite
});
buttonsContainer.appendChild(privacyButton);

// Erstelle den Impressum-Button
const imprintButton = createButton('Impressum');
imprintButton.addEventListener('click', function() {
    window.location.href = 'impressum.html'; // Navigiere zu Impressumseite
});
buttonsContainer.appendChild(imprintButton);

// Erstelle den AGBs-Button
const agbButton = createButton('AGBs');
agbButton.addEventListener('click', function() {
    window.location.href = 'agb.html'; // Navigiere zu AGBs-Seite
});
buttonsContainer.appendChild(agbButton);

// Füge den Container dem Dokument hinzu
document.body.appendChild(buttonsContainer);

// Erstelle den Login-Button separat
const loginButton = createButton('Login');
loginButton.addEventListener('click', function() {
    window.location.href = 'login.html'; // Navigiere zu Login-Seite
});
loginButton.style.position = 'fixed';
loginButton.style.top = '10px'; // Passen Sie den Abstand zum oberen Rand an
loginButton.style.right = '10px'; // Passen Sie den Abstand zum rechten Rand an
loginButton.style.zIndex = '1000'; // Stellen Sie sicher, dass der Button über anderen Inhalten liegt

// Ändern Sie die Hintergrundfarbe des Buttons
loginButton.style.backgroundColor = 'blue'; // Ändern Sie 'blue' zu Ihrer gewünschten Farbe

document.body.appendChild(loginButton);

// Funktion zum Erstellen eines Buttons
function createButton(text) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = 'button'; // Füge die Klasse 'button' hinzu
    return button;
}

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
    
    // Füge die Buttons dem Dokument hinzu
    document.body.appendChild(singlePlayerButton);
    document.body.appendChild(multiPlayerButton);
}

// Rufe die Funktion zum Erstellen der Buttons auf, sobald das Dokument geladen ist
document.addEventListener('DOMContentLoaded', createButtons);