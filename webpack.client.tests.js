let context = require.context('.', true, /__tests\/.+\.js$/);
context.keys().forEach(context);
