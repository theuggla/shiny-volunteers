let context = require.context('.', true, /\#tests\/.+\.js$/);
context.keys().forEach(context);
