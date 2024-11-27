const bodyParser = require('body-parser')


import express, { application, Application } from "express";
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import { db } from "./database";

import chalk from "chalk";


// import morgan from "morgan";
import cors from "cors";
// import path from "path";

import EmployesRoutes from "./routes/employesRoutes";
import EmployesStatusRoutes from "./routes/employesStatusRoutes";

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

  const swaggerSpec = swaggerJsdoc(options);



// dotenv.config({path: '.env'});
dotenv.config();

const corsOptions={
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
}

export class Server {
    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3033);
        // this.app.use(morgan('dev'));
        this.app.use(cors(corsOptions));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ limit: "5000mb" }));
        this.app.use(bodyParser.urlencoded({ limit: "50000mb", extended: true, parameterLimit: 50000 }));
        // this.app.use('/uploads', express.static(path.resolve('build/uploads')));
    }

    routes(): void {
        this.app.get('/', (req, res) => {
            res.send('Hello World');
        });


        this.app.use('/api/employes', EmployesRoutes);
        this.app.use('/api/employe_status', EmployesStatusRoutes);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }


    start(): void {
        const server = this.app.listen(this.app.get('port'), () => {
            console.log(chalk.blue(`\nServer corriendo en: ${this.app.get('port')}`));

        });
    }
}

const server = new Server();

server.start();


