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