import { Request, Response } from "express";
import { db } from "../database";
import jwt from "jsonwebtoken";
import bycript from "bcrypt";
import multer from 'multer';

// create table employes (
//     id serial primary key,
//     name varchar(255) not null,
//     document varchar(255) not null,
//     address varchar(255),
//     init_date timestamp,
//     email varchar(255),
//     phone_number varchar(255) not null,
//     created_at timestamp not null default now(),
//     updated_at timestamp
// );


class EmployesController {

    public async listEmployes(req: Request, res: Response): Promise<void> {
        const response = await db.query(`SELECT e.*, aes.*, es.name as status_name FROM employes e 
                                            join actual_employe_status aes on e.id = aes.employe_id
                                            join employe_status es on aes.employe_status_id = es.id
                                        ORDER BY e.id`);
        res.json(response.rows);
    }

    public async listEmployesPreselected(req: Request, res: Response): Promise<void> {
        const response = await db.query(`SELECT e.*, aes.*, es.name as status_name FROM employes e 
                                            join actual_employe_status aes on e.id = aes.employe_id
                                            join employe_status es on aes.employe_status_id = es.id
                                        WHERE aes.employe_status_id = 2`);
        res.json(response.rows);
    }

    public async listEmployesCandidates(req: Request, res: Response): Promise<void> {
        const response = await db.query(`SELECT e.*, aes.*, es.name as status_name FROM employes e 
                                            join actual_employe_status aes on e.id = aes.employe_id
                                            join employe_status es on aes.employe_status_id = es.id
                                        WHERE aes.employe_status_id = 1`);
        res.json(response.rows);
    }

    public async listEmployesHired(req: Request, res: Response): Promise<void> {
        const response = await db.query(`SELECT e.*, aes.*, es.name as status_name FROM employes e 
                                            join actual_employe_status aes on e.id = aes.employe_id
                                            join employe_status es on aes.employe_status_id = es.id
                                        WHERE aes.employe_status_id = 3`);
        res.json(response.rows);
    }

    public async createEmploye(req: Request, res: Response): Promise<void> {
        const { name, document, address, init_date, email, phone_number, employe_status_id } = req.body;
        const employes = await db.query('SELECT * FROM employes');
        const response = await db.query('INSERT INTO employes (name, document, address, init_date, email, phone_number, id) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *', [name, document, address, init_date, email, phone_number, employes.rows.length + 1]);
        const response2 = await db.query('INSERT INTO actual_employe_status (employe_id, employe_status_id) VALUES ($1, $2)', [response.rows[0].id, employe_status_id]); 
        res.json({
            message: 'Employe Added successfully',
            body: {
                employe: {name, document, address, init_date, email, phone_number}
            }
        });
    }

    public async getEmploye(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        const response = await db.query(`SELECT e.*, aes.employe_status_id  FROM employes e
                                            JOIN actual_employe_status aes ON e.id = aes.employe_id
                                         WHERE e.id = $1`, [id]);
        res.json(response.rows[0]);
    }

    public async updateEmploye(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        const { name, document, address, init_date, email, phone_number, employe_status_id } = req.body;
        const response = await db.query('UPDATE employes SET name = $1, document = $2, address = $3, init_date = $4, email = $5, phone_number = $6 WHERE id = $7', [name, document, address, init_date, email, phone_number, id]);

        const response2 = await db.query('UPDATE actual_employe_status SET employe_status_id = $1 WHERE employe_id = $2', [employe_status_id, id]);
        res.json({
            message: 'Employe Updated successfully',
            body: {
                employe: {name, document, address, init_date, email, phone_number}
            }
        });
    }

    public async deleteEmploye(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        await db.query('DELETE FROM employes WHERE id = $1', [id]);
        res.json(`Employe ${id} deleted Successfully`);
    }
   

}





export const employesController = new EmployesController();