import * as express from 'express'
import { Request }  from 'express'
import Controller   from 'interfaces/controller.interface'

class UserController implements Controller {

  public path = '/user'
  public router = express.Router()

  public users = [
    {
      id: 1,
      name: 'Ali'
    },
    {
      id: 2,
      name: 'Can'
    },
    {
      id: 3,
      name: 'Ahmet'
    }
  ];

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get('/', this.getAllUser)
    this.router.get('/:id', this.getUserById)
  }

  getAllUser = (req: Request, res: express.Response, next: express.NextFunction) => {
    res.send(this.users)
  }

  getUserById = (req: Request, res: express.Response, next: express.NextFunction) => {
    res.send(this.users.find(usr => usr.id.toString() === req.params.id))
  }
}

export default UserController