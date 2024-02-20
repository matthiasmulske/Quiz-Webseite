function AgbsText() {
    return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Allgemeine Geschäftsbedingungen</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 20px;
            }
            h1 {
                font-size: 24px;
            }
            h2 {
                font-size: 20px;
            }
            p {
                font-size: 16px;
            }
            ul {
                list-style-type: disc;
                margin-left: 20px;
            }
        </style>
    </head>
    <body>
        <h1>Allgemeine Geschäftsbedingungen (AGBs)</h1>

        <h2>TL; DR</h2>
        <ul>
            <li>Lassen Sie sich nicht beim Spielen helfen</li>
            <li>Betrügen Sie nicht</li>
            <li>Halten Sie sich an die Standards und brechen Sie keine Gesetze</li>
            <li>Viel Spaß mit dieser Seite</li>
        </ul>

        <h2>Herzlich willkommen bei Name der Webseite</h2>
        <p>
            Bitte lesen Sie sich die Nutzungsbedingungen gründlich durch, bevor Sie die Webseite Name der Webseite benutzen. Durch die Nutzung der Webseite Name der Webseite erklären Sie sich mit den nachstehenden Bedingungen einverstanden.
        </p>

        <!-- Weitere Abschnitte hier einfügen, entsprechend Ihrer AGBs -->

    </body>
    </html>
    `;
}


module.exports = { getAGBText: AgbsText };