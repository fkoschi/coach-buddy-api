import * as express     from 'express';
import * as cors        from 'cors';
import * as session     from 'express-session';
import * as bodyParser  from 'body-parser';
import Controller       from './interfaces/controller.interface';

import * as redis       from 'redis';
const redisClient       = redis.createClient();
const redisStore        = require('connect-redis')(session);

class App {
  public app: express.Application;
  public port = process.env.PORT || 5000;

  constructor(controllers: Controller[], middlewares?: any[], port?: number) {
    this.app = express();
    this.port = port;

    redisClient.on('error', (err: string) => {
      console.log(`Redis error: ${err}`);
    })

    this.app.use(session({
      secret: 'JustASecret', // session ID hash (cookie id and redis key)
      name: '_coachBuddyApi', // cookie name in browser,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
      store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86499}) // time to live -> expiration time for each Redis session Id, in seconds
    }))

    this.app.use(cors());

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
      const apiPath = process.env.API_BASE_PATH + controller.path;
      this.app.use(apiPath, controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;