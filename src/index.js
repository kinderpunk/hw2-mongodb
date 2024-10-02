import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';


async function startApp() {
  try {
    // Initialize MongoDB connection
    await initMongoConnection();

    // Setup and start server
    setupServer();
  } catch (error) {
    console.error('Failed to start the app:', error);
    process.exit(1);
  }
}

startApp();
