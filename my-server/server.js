const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'isef01-quiz.cxcheuy8ztxa.eu-north-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: '#quizisef01',
    //database: 'your-database', // Replace 'your-database' with your actual database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});
