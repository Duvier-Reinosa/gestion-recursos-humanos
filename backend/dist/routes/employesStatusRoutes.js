"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employesStatusControllers_1 = require("../controllers/employesStatusControllers");
// import verifyToken from "../jwt.services";
class EmployesStatusRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', employesStatusControllers_1.employesStatusController.listStatus);
        this.router.post('/', employesStatusControllers_1.employesStatusController.createStatus);
        this.router.get('/:id', employesStatusControllers_1.employesStatusController.getStatus);
        this.router.put('/:id', employesStatusControllers_1.employesStatusController.updateStatus);
        this.router.delete('/:id', employesStatusControllers_1.employesStatusController.deleteStatus);
        this.router.post('/create-employe-status', employesStatusControllers_1.employesStatusController.createEmployeStatus);
    }
}
const employesStatusRoutes = new EmployesStatusRoutes();
exports.default = employesStatusRoutes.router;
