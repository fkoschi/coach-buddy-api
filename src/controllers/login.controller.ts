import * as express from 'express'
import { Request } from 'express'
import Controller from '../interfaces/controller.interface'
import HttpException from '../exceptions/HttpException'

class LoginController implements Controller {

  public path = '/login'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.post('/', this.login)
  }

  login = (req: Request, res: express.Response, next: express.NextFunction) => {

    if (req.body.email === 'felix.koschi@gmail.com') {
      req.session.email = req.body.email;
      res.send({ status: 'Erfolgreich angemeldet' })
    } else {
      throw new HttpException(401, 'Du kommst hier nicht rein.')
    }
  }
}

export default LoginController