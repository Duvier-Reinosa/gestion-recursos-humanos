import { Request, Response } from "express";
import { db } from "../database";
import jwt from "jsonwebtoken";
import bycript from "bcrypt";
import multer from 'multer';

// create table actual_employe_status (
//     id serial primary key,
//     employe_id int not null,
//     employe_status_id int not null,
//     created_at timestamp not null default now(),
//     updated_at timestamp,
//     foreign key (id) references employes(id),
//     foreign key (id) references employe_status(id)
// );


class EmployesStatusController {
    public async listStatus(req: Request, res: Response): Promise<void> {
        const response = await db.query('SELECT * FROM employe_status');
        res.json(response.rows);
    }

    public async createStatus(req: Request, res: Response): Promise<void> {
        const { employe_id, employe_status_id } = req.body;
        const response = await db.query('INSERT INTO actual_employe_status (employe_id, employe_status_id) VALUES ($1, $2)', [employe_id, employe_status_id]);
        res.json({
            message: 'Employe Status Added successfully',
            body: {
                employe_status: {employe_id, employe_status_id}
            }
        });
    }

    public async getStatus(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        const response = await db.query('SELECT * FROM actual_employe_status WHERE id = $1', [id]);
        res.json(response.rows);
    }

    public async updateStatus(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        const { employe_id, employe_status_id } = req.body;
        const response = await db.query('UPDATE actual_employe_status SET employe_id = $1, employe_status_id = $2 WHERE id = $3', [employe_id, employe_status_id, id]);
        res.json({
            message: 'Employe Status Updated successfully',
            body: {
                employe_status: {employe_id, employe_status_id}
            }
        });
    }

    public async deleteStatus(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        await db.query('DELETE FROM actual_employe_status WHERE id = $1', [id]);
        res.json(`Employe Status ${id} deleted Successfully`);
    }

    public async createEmployeStatus(req: Request, res: Response): Promise<void> {
        const { employe_id, employe_status_id } = req.body;

        // first we need to check if the employe_id and employe_status_id exist in the database
        const exist = await db.query('SELECT * FROM employes WHERE id = $1', [employe_id]);

        if (exist.rows.length === 0) {
            return res.json('Employe does not exist');
        }

        const existStatus = await db.query('SELECT * FROM actual_employe_status WHERE id = $1', [employe_status_id]);

        if (existStatus.rows.length > 0) {
            await db.query('DELETE FROM actual_employe_status WHERE id = $1', [employe_status_id]);
        }



        const response = await db.query('INSERT INTO actual_employe_status (employe_id, employe_status_id) VALUES ($1, $2)', [employe_id, employe_status_id]);
        res.json({
            message: 'Employe Status Added successfully',
            body: {
                employe_status: {employe_id, employe_status_id}
            }
        });
    }
   

}





export const employesStatusController = new EmployesStatusController();