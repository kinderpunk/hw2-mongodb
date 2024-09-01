const setupServer = require('./server');
const initMongoConnection = require('./db/initMongoConnection');

initMongoConnection().then(setupServer);
