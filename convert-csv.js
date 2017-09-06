// usage $ node convert-csv.js > rankings.js

const csv = require('csv-array');

csv.parseCSV('rankings-standard.csv', data => {
    const formatted = data.map(row => {
        return Object.keys(row).reduce((aggr, key) => {
            const value = row[key];
            const formattedKey = key.replace(/"/g, '');

            aggr[formattedKey] = value;

            return aggr;
        }, {});
    });

    console.log(JSON.stringify(formatted, null, 4));
}, true);
