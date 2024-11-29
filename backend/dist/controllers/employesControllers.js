"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employesController = void 0;
const database_1 = require("../database");
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
    listEmployes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.db.query(`SELECT e.*, aes.*, es.name as status_name FROM employes e 
                                            join actual_employe_status aes on e.id = aes.employe_id
                                            join employe_status es on aes.employe_status_id = es.id
                                        ORDER BY e.id`);
            res.json(response.rows);
        });
    }
    listEmployesPreselected(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.db.query(`SELECT e.*, aes.*, es.name as status_name FROM employes e 
                                            join actual_employe_status aes on e.id = aes.employe_id
                                            join employe_status es on aes.employe_status_id = es.id
                                        WHERE aes.employe_status_id = 2`);
            res.json(response.rows);
        });
    }
    listEmployesCandidates(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.db.query(`SELECT e.*, aes.*, es.name as status_name FROM employes e 
                                            join actual_employe_status aes on e.id = aes.employe_id
                                            join employe_status es on aes.employe_status_id = es.id
                                        WHERE aes.employe_status_id = 1`);
            res.json(response.rows);
        });
    }
    listEmployesHired(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.db.query(`SELECT e.*, aes.*, es.name as status_name FROM employes e 
                                            join actual_employe_status aes on e.id = aes.employe_id
                                            join employe_status es on aes.employe_status_id = es.id
                                        WHERE aes.employe_status_id = 3`);
            res.json(response.rows);
        });
    }
    createEmploye(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, document, address, init_date, email, phone_number, employe_status_id } = req.body;
            const employes = yield database_1.db.query('SELECT * FROM employes');
            const response = yield database_1.db.query('INSERT INTO employes (name, document, address, init_date, email, phone_number, id) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *', [name, document, address, init_date, email, phone_number, employes.rows.length + 1]);
            const response2 = yield database_1.db.query('INSERT INTO actual_employe_status (employe_id, employe_status_id) VALUES ($1, $2)', [response.rows[0].id, employe_status_id]);
            res.json({
                message: 'Employe Added successfully',
                body: {
                    employe: { name, document, address, init_date, email, phone_number }
                }
            });
        });
    }
    getEmploye(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const response = yield database_1.db.query(`SELECT e.*, aes.employe_status_id  FROM employes e
                                            JOIN actual_employe_status aes ON e.id = aes.employe_id
                                         WHERE e.id = $1`, [id]);
            res.json(response.rows[0]);
        });
    }
    updateEmploye(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const { name, document, address, init_date, email, phone_number, employe_status_id } = req.body;
            const response = yield database_1.db.query('UPDATE employes SET name = $1, document = $2, address = $3, init_date = $4, email = $5, phone_number = $6 WHERE id = $7', [name, document, address, init_date, email, phone_number, id]);
            const response2 = yield database_1.db.query('UPDATE actual_employe_status SET employe_status_id = $1 WHERE employe_id = $2', [employe_status_id, id]);
            res.json({
                message: 'Employe Updated successfully',
                body: {
                    employe: { name, document, address, init_date, email, phone_number }
                }
            });
        });
    }
    deleteEmploye(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield database_1.db.query('DELETE FROM employes WHERE id = $1', [id]);
            res.json(`Employe ${id} deleted Successfully`);
        });
    }
}
exports.employesController = new EmployesController();
