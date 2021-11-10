import * as restify from 'restify'

export abstract class Router {
  abstract applyRoutes: any (application: restify.Server)
}
