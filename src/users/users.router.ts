import * as restify from 'restify'
import { Router } from '../common/router'
import {User} from '../users/users.model'

class UsersRouter extends Router {
  applyRoutes(application: restify.Server){
    application.get('/users', (req, resp, next) => {
      User.findAll().then(users => {
        resp.json(users)
        return next()
      })
    })

    application.get('/users/:id', (req, resp, next) => {
      User.findById(req.params.id)
        .then(user => {
          if (user) {
            resp.json(user)
            return next()
          }
          resp.send(404)
          next()
        })
    })
  }
}

export const usersRouter = new UsersRouter()
