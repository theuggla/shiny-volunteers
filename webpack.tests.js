//Get all the tests into one file.
var context = require.context('.', true, /__tests__\/.+\.js$/);
context.keys().forEach(context);
