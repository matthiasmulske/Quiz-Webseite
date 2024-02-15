// Funktion zum Erstellen der Login-Maske und Hinzufügen zum Dokument
function createLoginForm() {
    // Erstelle ein Formular für den Login
    const loginForm = document.createElement('form');
    loginForm.style.display = 'flex';
    loginForm.style.flexDirection = 'column';
    loginForm.style.alignItems = 'center';
    loginForm.style.justifyContent = 'center';
    loginForm.style.marginTop = '20vh'; // Platzieren Sie das Formular etwa in der Mitte der Seite

    /*Erstelle das Profilbild
    const profileImage = document.createElement('img');
    profileImage.src = 'path/to/profile/image.jpg'; // Passe den Pfad zum Profilbild an
    profileImage.style.width = '100px'; // Breite des Profilbilds
    profileImage.style.height = '100px'; // Höhe des Profilbilds
    profileImage.style.borderRadius = '50%'; // Runde Ecken für ein rundes Profilbild
    profileImage.style.marginBottom = '20px'; // Abstand unter dem Profilbild*/
    
    // Erstelle ein Eingabefeld für den Benutzernamen
    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.placeholder = 'Benutzername';
    usernameInput.style.marginBottom = '10px';
    usernameInput.style.width = '300px';
    usernameInput.style.height = '40px';
    usernameInput.style.border = '1px solid #ccc';
    
    // Erstelle ein Eingabefeld für das Passwort
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Passwort';
    passwordInput.style.marginBottom = '10px';
    passwordInput.style.width = '300px';
    passwordInput.style.height = '40px';
    passwordInput.style.border = '1px solid #ccc';
    
    // Erstelle den Login-Button
    const loginButton = document.createElement('button');
    loginButton.textContent = 'Anmelden';
    loginButton.style.padding = '10px 20px';
    loginButton.style.backgroundColor = '#3498db';
    loginButton.style.color = 'white';
    loginButton.style.border = 'none';
    loginButton.style.borderRadius = '5px';
    
    // Füge die Formularelemente dem Formular hinzu
    loginForm.appendChild(usernameInput);
    loginForm.appendChild(passwordInput);
    loginForm.appendChild(loginButton);
    
    // Füge das Formular der Seite hinzu
    document.body.appendChild(loginForm);
    
    // Funktion, die aufgerufen wird, wenn der Login-Button geklickt wird
    function handleLogin() {
        const username = usernameInput.value;
        const password = passwordInput.value;
        // Hier kannst du deine Login-Logik einfügen, z.B. API-Aufrufe, Überprüfung von Benutzername und Passwort usw.
        console.log('Benutzername:', username, 'Passwort:', password);
    }
    
    // Füge einen Event-Listener hinzu, um den Login-Prozess zu steuern
    loginButton.addEventListener('click', handleLogin);
}

// Rufe die Funktion zum Erstellen der Login-Maske auf, sobald das Dokument geladen ist
document.addEventListener('DOMContentLoaded', createLoginForm);