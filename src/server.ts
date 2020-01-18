import App              from './app'
import UserController   from './controllers/user.controller'
import LoginController  from './controllers/login.controller';
import loggerMiddleware from './middleware/logger.middleware'
import errorMiddleware  from './middleware/error.middleware'

const app = new App(
  [
    new UserController(),
    new LoginController(),
  ],
  [
    loggerMiddleware,
    errorMiddleware
  ],
  5000,
);

app.listen();