import { GameOfDronesApplication } from './application';
import { ApplicationConfig } from '@loopback/core';

export { GameOfDronesApplication };

export async function main(options: ApplicationConfig = {}) {
  const app = new GameOfDronesApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);

  return app;
}
