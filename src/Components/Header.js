// Funktion zum Erstellen eines Buttons
function createButton(text) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = 'button'; // Füge die Klasse 'button' hinzu
    return button;
}

// Erstelle den Login-Button separat
const loginButton = createButton('Login');
loginButton.addEventListener('click', function() {
    window.location.href = 'LoginMaske.js'; // Navigiere zu Login-Seite
});
loginButton.style.position = 'fixed';
loginButton.style.top = '10px'; // Passen Sie den Abstand zum oberen Rand an
loginButton.style.right = '10px'; // Passen Sie den Abstand zum rechten Rand an
loginButton.style.zIndex = '1000'; // Stellen Sie sicher, dass der Button über anderen Inhalten liegt
loginButton.style.backgroundColor = 'transparent'; // Setze die Hintergrundfarbe auf transparent
loginButton.style.color = 'black'; // Textfarbe des Buttons
loginButton.style.border = '1px solid white'; // Umrandung um den Button
loginButton.style.padding = '10px 20px'; // Innenabstand des Buttons
loginButton.style.borderRadius = '5px'; // Abgerundete Ecken des Buttons
document.body.appendChild(loginButton);