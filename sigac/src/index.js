import app from './app.js';
import { config } from './config.js';
import { testDb } from './db.js';

async function start() {
  await testDb();
  app.listen(config.port, () =>
    console.log(`API lista en http://localhost:${config.port}`)
  );
}
start().catch((e) => {
  console.error('No se pudo iniciar:', e);
  process.exit(1);
});
