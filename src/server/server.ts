import * as restify from 'restify'
import { enviroment } from '../common/enviroment'
import { Router } from '../common/router'

export class Server {
  application: restify.Server
  initRoutes(routers: Router[]): Promise<any>{
    return new Promise((resolve, reject) => {
      try {
        this.application = restify.createServer({
          name: 'api-flow',
          version: '1.0.0'
        })
        this.application.use(restify.plugins.queryParser())
        //routes
        for (let router of routers) {
          router.applyRoutes(this.application)
        }
        this.application.get('/health-check', (req, resp, next) => {
          // resp.status(204)
          // resp.contentType = 'application/json',
          resp.status(400)
          resp.setHeader('Content-type', 'application/json'),
          resp.send({
            request: 'health check',
            message: 'Server is 100%',
            status: resp.statusCode
          })
          // resp.json({
          //   request: 'health check',
          //   message: 'Server is 100%',
          //   status: resp.statusCode
          // })
          return next()
        })

        this.application.get('/info', [(req, resp, next) => {
          // if (req.userAgent() && req.userAgent().includes('Mozilla/5.0')) {
          if (req.userAgent() && req.userAgent().includes('MSIE 7.0')) {
            resp.status(400)
            resp.json({message: 'update your browser!'})
            const error: any = new Error()
            error.statusCode = 400
            error.message = 'Please, update your browser'
            next(error)
          }
          next()
        }, (req, resp, next) => {
          resp.json({
            browser: req.userAgent(),
            method: req.method,
            url: req.href(),
            path: req.path(),
            query: req.query,
            params: req.params,
          })
          return next()
        }])
        //
        this.application.listen(enviroment.server.port, () => {
          resolve(this.application)
          console.log('API is running on http://localhost:3000')
        })
      }catch(error){
        reject(error)
      }
    })
  }
  bootstrap(routers: Router[] = []): Promise<Server>{
    return this.initRoutes(routers).then(() => this)
  }
}
