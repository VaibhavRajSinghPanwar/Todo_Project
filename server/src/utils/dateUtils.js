const { format, isValid } = require('date-fns');


function normalizeDateString(input) {
if (!input) return null;
// Accept variants like 2021-1-2, 2021-01-02, 2021-1-02 etc.
const parts = input.split('-').map(Number);
if (parts.length !== 3) return null;
const [y, m, d] = parts;
const dt = new Date(y, m - 1, d);
if (!isValid(dt)) return null;
return format(dt, 'yyyy-MM-dd');
}


function dateStringToDate(input) {
const normalized = normalizeDateString(input);
if (!normalized) return null;
// Create a Date at local midnight (be careful with timezone in production)
return new Date(normalized + 'T00:00:00');
}


module.exports = { normalizeDateString, dateStringToDate };