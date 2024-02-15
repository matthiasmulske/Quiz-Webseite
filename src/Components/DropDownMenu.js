function createDropdownMenu(options) {
    const selectElement = document.createElement('select');

    // Füge die Optionen dem Dropdown-Menü hinzu
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.textContent = option.label;
        optionElement.value = option.value;
        selectElement.appendChild(optionElement);
    });

    // Füge die benötigten CSS-Stile hinzu, um das Dropdown-Menü nach oben rechts zu positionieren
    selectElement.style.position = 'fixed';
    selectElement.style.top = '10px';
    selectElement.style.right = '10px';

    // Füge das Dropdown-Menü dem Dokument hinzu
    document.body.appendChild(selectElement);

    return selectElement;
}

// Beispielaufruf der Funktion mit Optionen
const options = [
    { label: 'Profil', value: 'Profil' },
    { label: 'Einstellungen', value: 'Einstellungen' },
    { label: 'Logout', value: 'Logout' }
];

const dropdownMenu = createDropdownMenu(options);