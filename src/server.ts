import App              from './app';
import UserController  from './controllers/user.controller';
import loggerMiddleware from './middleware/logger.middleware';
import errorMiddleware  from './middleware/error.middleware';

const app = new App(
  [
    new UserController()
  ],
  [
    loggerMiddleware,
    errorMiddleware
  ],
  5000,
);

app.listen();