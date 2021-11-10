"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const restify = __importStar(require("restify"));
const enviroment_1 = require("../common/enviroment");
class Server {
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'api-flow',
                    version: '1.0.0'
                });
                this.application.use(restify.plugins.queryParser());
                //routes
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                this.application.get('/health-check', (req, resp, next) => {
                    // resp.status(204)
                    // resp.contentType = 'application/json',
                    resp.status(400);
                    resp.setHeader('Content-type', 'application/json'),
                        resp.send({
                            request: 'health check',
                            message: 'Server is 100%',
                            status: resp.statusCode
                        });
                    // resp.json({
                    //   request: 'health check',
                    //   message: 'Server is 100%',
                    //   status: resp.statusCode
                    // })
                    return next();
                });
                this.application.get('/info', [(req, resp, next) => {
                        // if (req.userAgent() && req.userAgent().includes('Mozilla/5.0')) {
                        if (req.userAgent() && req.userAgent().includes('MSIE 7.0')) {
                            resp.status(400);
                            resp.json({ message: 'update your browser!' });
                            const error = new Error();
                            error.statusCode = 400;
                            error.message = 'Please, update your browser';
                            next(error);
                        }
                        next();
                    }, (req, resp, next) => {
                        resp.json({
                            browser: req.userAgent(),
                            method: req.method,
                            url: req.href(),
                            path: req.path(),
                            query: req.query,
                            params: req.params,
                        });
                        return next();
                    }]);
                //
                this.application.listen(enviroment_1.enviroment.server.port, () => {
                    resolve(this.application);
                    console.log('API is running on http://localhost:3000');
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initRoutes(routers).then(() => this);
    }
}
exports.Server = Server;
