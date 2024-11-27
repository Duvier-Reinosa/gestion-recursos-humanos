"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employesControllers_1 = require("../controllers/employesControllers");
// import verifyToken from "../jwt.services";
class EmployesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', employesControllers_1.employesController.listEmployes);
        this.router.get('/preseleccionado', employesControllers_1.employesController.listEmployesPreselected);
        this.router.get('/candidatos', employesControllers_1.employesController.listEmployesCandidates);
        this.router.get('/contratados', employesControllers_1.employesController.listEmployesHired);
        this.router.post('/', employesControllers_1.employesController.createEmploye);
        this.router.get('/:id', employesControllers_1.employesController.getEmploye);
        this.router.put('/:id', employesControllers_1.employesController.updateEmploye);
        this.router.delete('/:id', employesControllers_1.employesController.deleteEmploye);
    }
}
const employesRoutes = new EmployesRoutes();
exports.default = employesRoutes.router;
