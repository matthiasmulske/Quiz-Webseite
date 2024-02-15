// Erstelle einen Container für die Buttons
const buttonsContainer = document.createElement('div');
buttonsContainer.style.position = 'fixed';
buttonsContainer.style.bottom = '10px';
buttonsContainer.style.left = '50%';
buttonsContainer.style.transform = 'translateX(-50%)';
buttonsContainer.style.zIndex = '1000';

// Funktion zum Erstellen eines Buttons
function createButton(text) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = 'button'; // Füge die Klasse 'button' hinzu
    button.style.marginRight = '50px'; // Setze den rechten Abstand zwischen den Buttons
    button.style.backgroundColor = 'transparent'; // Setze die Hintergrundfarbe auf transparent
    button.style.color = 'blacke'; // Setze die Textfarbe auf weiß
    button.style.border = '1px solid white'; // Setze einen weißen Rand um den Button
    return button;
}

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