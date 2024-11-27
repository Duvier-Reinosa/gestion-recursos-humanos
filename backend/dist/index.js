"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const bodyParser = require('body-parser');
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const chalk_1 = __importDefault(require("chalk"));
// import morgan from "morgan";
const cors_1 = __importDefault(require("cors"));
// import path from "path";
const employesRoutes_1 = __importDefault(require("./routes/employesRoutes"));
const employesStatusRoutes_1 = __importDefault(require("./routes/employesStatusRoutes"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mi API',
            version: '1.0.0',
            description: 'Documentación de mi API',
        },
    },
    // Path donde se encuentran tus archivos de rutas
    apis: ['./routes/*.js'], // o cualquier archivo que tenga tus rutas
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
// dotenv.config({path: '.env'});
dotenv_1.default.config();
const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
};
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3003);
        // this.app.use(morgan('dev'));
        this.app.use((0, cors_1.default)(corsOptions));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ limit: "5000mb" }));
        this.app.use(bodyParser.urlencoded({ limit: "50000mb", extended: true, parameterLimit: 50000 }));
        // this.app.use('/uploads', express.static(path.resolve('build/uploads')));
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello World');
        });
        this.app.use('/api/employes', employesRoutes_1.default);
        this.app.use('/api/employe_status', employesStatusRoutes_1.default);
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    }
    start() {
        const server = this.app.listen(this.app.get('port'), () => {
            console.log(chalk_1.default.blue(`\nServer corriendo en: ${this.app.get('port')}`));
        });
    }
}
exports.Server = Server;
const server = new Server();
server.start();
