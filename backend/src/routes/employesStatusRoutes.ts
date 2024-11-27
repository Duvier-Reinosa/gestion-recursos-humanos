import { Router } from "express";
import { employesStatusController } from "../controllers/employesStatusControllers";
// import verifyToken from "../jwt.services";

class EmployesStatusRoutes {
    public router : Router = Router();
    constructor(){
        this.config();
    }

    public config() : void {
        this.router.get('/', employesStatusController.listStatus);
        this.router.post('/', employesStatusController.createStatus);
        this.router.get('/:id', employesStatusController.getStatus);
        this.router.put('/:id', employesStatusController.updateStatus);
        this.router.delete('/:id', employesStatusController.deleteStatus);

        this.router.post('/create-employe-status', employesStatusController.createEmployeStatus);
    }


}

const employesStatusRoutes = new EmployesStatusRoutes();
export default employesStatusRoutes.router;