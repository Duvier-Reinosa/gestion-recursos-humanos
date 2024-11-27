import { Router } from "express";
import { employesController } from "../controllers/employesControllers";
// import verifyToken from "../jwt.services";

class EmployesRoutes {
    public router : Router = Router();
    constructor(){
        this.config();
    }

    public config() : void {
        this.router.get('/', employesController.listEmployes);
        this.router.get('/preseleccionado', employesController.listEmployesPreselected);
        this.router.get('/candidatos', employesController.listEmployesCandidates);
        this.router.get('/contratados', employesController.listEmployesHired);
        this.router.post('/', employesController.createEmploye);
        this.router.get('/:id', employesController.getEmploye);
        this.router.put('/:id', employesController.updateEmploye);
        this.router.delete('/:id', employesController.deleteEmploye);
    }


}

const employesRoutes = new EmployesRoutes();
export default employesRoutes.router;