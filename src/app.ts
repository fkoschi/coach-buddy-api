import * as express     from 'express';
import * as bodyParser  from 'body-parser';
import Controller       from './interfaces/controller.interface';

class App {
  public app: express.Application;
  public port: number = 5000;

  constructor(controllers: Controller[], middlewares?: any[], port?: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares(middlewares);
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares(middlewares) {
    this.app.use(bodyParser.json());
    if (middlewares) {
      middlewares.forEach((middleware) => {
        this.app.use(middleware);
      })
    }
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;